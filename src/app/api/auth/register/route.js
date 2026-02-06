import { NextResponse } from 'next/server';
import db from '../../../../lib/db.js';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { email, password, role_id } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let existingUsers;
    try {
      existingUsers = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    } catch (dbError) {
      console.error('[auth/register] DB query failed:', dbError.message);
      return NextResponse.json(
        { message: 'An error occurred during registration' },
        { status: 500 }
      );
    }

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log('[auth/register] Password hashed successfully');
    } catch (bcryptError) {
      console.error('[auth/register] Password hashing failed:', bcryptError.message);
      return NextResponse.json(
        { message: 'An error occurred during registration' },
        { status: 500 }
      );
    }

    // Insert the user into the database with hashed password
    try {
      await db.query(
        'INSERT INTO users (email, `password`, role_id) VALUES (?, ?, ?)',
        [email, hashedPassword, role_id || 2] // Default role_id = 2 (user)
      );
      console.log('[auth/register] User registered successfully:', email);
    } catch (dbError) {
      console.error('[auth/register] User insertion failed:', dbError.message);
      return NextResponse.json(
        { message: 'An error occurred while saving the user' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[auth/register] Caught error:', error.message, error.stack);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
