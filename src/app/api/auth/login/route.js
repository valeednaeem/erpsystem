import { NextResponse } from 'next/server';
import db from '../../../../lib/db.js';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Query the users table for the email
    let users;
    try {
      users = await db.query('SELECT id, email, `password`, role_id FROM users WHERE email = ?', [email]);
      console.log('[auth/login] DB query success, users count:', users.length);
    } catch (dbError) {
      console.error('[auth/login] DB query failed:', dbError.message);
      throw dbError;
    }

    if (users.length === 0) {
      console.log('[auth/login] No user found for email:', email);
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = users[0];
    console.log('[auth/login] User fetched:', { id: user.id, email: user.email, role_id: user.role_id });
    console.log('[auth/login] Stored password hash length:', user.password?.length);
    console.log('[auth/login] Stored password hash first 20 chars:', user.password?.substring(0, 20));
    console.log('[auth/login] Incoming password length:', password?.length);

    // Compare the provided password with the stored hash
    let passwordMatch;
    try {
      passwordMatch = await bcrypt.compare(password, user.password);
      console.log('[auth/login] Password comparison result:', passwordMatch);
    } catch (bcryptError) {
      console.error('[auth/login] bcrypt.compare failed:', bcryptError.message);
      throw bcryptError;
    }

    if (!passwordMatch) {
      console.log('[auth/login] Password mismatch for user:', email);
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create response with user data
    const response = NextResponse.json(
        { message: 'Login successful', userId: user.id, role_id: user.role_id || null },
        { status: 200 }
    );

    // Set the user_id cookie (httpOnly for security, 7-day expiry)
    response.cookies.set('user_id', String(user.id), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'lax',
    });

    console.log(`[auth] User ${email} (id: ${user.id}) logged in successfully`);

    return response;
  } catch (error) {
    console.error('[auth/login] Caught error:', error.message, error.stack);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
