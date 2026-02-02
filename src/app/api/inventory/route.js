import db from "../../../lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


export async function GET() {
  const [rows] = await db.query("SELECT * FROM inventory");
  return NextResponse.json(rows);
}
