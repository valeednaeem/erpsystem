import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { requirePermission } from "@/lib/apiGuard";
import { logActivity } from "@/lib/activityLogger";

export async function POST(req) {
  const guard = await requirePermission(req, "PRODUCTION_COMPLETE");

  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.error },
      { status: guard.status }
    );
  }

  const { production_order_id, product_id, quantity } =
    await req.json();

  await db.execute(
    `
    UPDATE production_orders
    SET status = 'COMPLETED'
    WHERE id = ?
    `,
    [production_order_id]
  );

  // Add finished goods to warehouse stock
  await db.execute(
    `
    INSERT INTO warehouse_stock
    (product_id, quantity)
    VALUES (?, ?)
    `,
    [product_id, quantity]
  );

  await logActivity({
    userId: guard.userId,
    action: "COMPLETE",
    module: "PRODUCTION",
    path: "/api/production/complete",
    details: `PO:${production_order_id}, Product:${product_id}, Qty:${quantity}`,
  });

  return NextResponse.json({ success: true });
}
