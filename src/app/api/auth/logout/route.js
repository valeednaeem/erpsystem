import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );

    // Clear the user_id cookie by setting it to empty value
    response.cookies.set('user_id', '', {
      httpOnly: true,
      maxAge: 0, // Expire immediately
      path: '/',
      sameSite: 'lax',
      secure: false, // Set to true if using HTTPS
    });

    console.log('[auth/logout] User logged out, user_id cookie cleared');

    return response;
  } catch (error) {
    console.error('[auth/logout] Error:', error);
    return NextResponse.json(
      { message: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
