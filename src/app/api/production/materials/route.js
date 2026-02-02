import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { requirePermission } from "@/lib/apiGuard";
import { logActivity } from "@/lib/activityLogger";

export async function POST(req) {
  const guard = await requirePermission(req, "PRODUCTION_MATERIAL_ASSIGN");

  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.error },
      { status: guard.status }
    );
  }

  const { production_order_id, material_id, quantity } =
    await req.json();

  await db.execute(
    `
    INSERT INTO production_materials
    (production_order_id, material_id, quantity)
    VALUES (?, ?, ?)
    `,
    [production_order_id, material_id, quantity]
  );

  await logActivity({
    userId: guard.userId,
    action: "ASSIGN_MATERIAL",
    module: "PRODUCTION",
    path: "/api/production/materials",
    details: `PO:${production_order_id}, Material:${material_id}, Qty:${quantity}`,
  });

  return NextResponse.json({ success: true });
}
