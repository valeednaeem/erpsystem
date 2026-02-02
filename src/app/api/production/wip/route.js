import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { requirePermission } from "@/lib/apiGuard";
import { logActivity } from "@/lib/activityLogger";

export async function POST(req) {
  const guard = await requirePermission(req, "PRODUCTION_WIP_UPDATE");

  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.error },
      { status: guard.status }
    );
  }

  const { production_order_id, stage, progress } =
    await req.json();

  await db.execute(
    `
    INSERT INTO wip_tracking
    (production_order_id, stage, progress)
    VALUES (?, ?, ?)
    `,
    [production_order_id, stage, progress]
  );

  return NextResponse.json({ success: true });
}
