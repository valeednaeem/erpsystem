import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { requirePermission } from "@/lib/apiGuard";
import { logActivity } from "@/lib/activityLogger";

export async function POST(req) {
  const guard = await requirePermission(req, "PRODUCTION_START");

  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.error },
      { status: guard.status }
    );
  }

  const { production_order_id } = await req.json();

  await db.execute(
    `
    UPDATE production_orders
    SET status = 'IN_PROGRESS'
    WHERE id = ?
    `,
    [production_order_id]
  );

  await logActivity({
    userId: guard.userId,
    action: "START",
    module: "PRODUCTION",
    path: "/api/production/start",
    details: `ProductionOrder ${production_order_id}`,
  });

  return NextResponse.json({ success: true });
}
