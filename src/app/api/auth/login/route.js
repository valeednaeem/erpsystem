import db from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  const [rows] = await db.query(
    "SELECT id, name FROM users WHERE email=? AND password=?",
    [email, password]
  );

  if (!rows.length) {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 });
  }

  return NextResponse.json({ user: rows[0] });
}
