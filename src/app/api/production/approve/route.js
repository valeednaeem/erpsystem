import { NextResponse } from "next/server";
import db from "@/lib/db";
import { requirePermission } from "@/lib/apiGuard";
import { logActivity } from "@/lib/activityLogger";

export async function POST(req) {
  const guard = await requirePermission(req, "PRODUCTION_APPROVE");

  if (!guard.ok) {
    return NextResponse.json(
      { error: guard.error },
      { status: guard.status }
    );
  }

  const { sales_order_id } = await req.json();

  // 1️⃣ Create production order
  const [prod] = await db.execute(
    `
    INSERT INTO production_orders (sales_order_id, status)
    VALUES (?, 'APPROVED')
    `,
    [sales_order_id]
  );

  // 2️⃣ Update sales order status
  await db.execute(
    `
    UPDATE sales_orders
    SET status = 'APPROVED_FOR_PRODUCTION'
    WHERE id = ?
    `,
    [sales_order_id]
  );

  // 3️⃣ Log activity
  await logActivity({
    userId: guard.userId,
    action: "APPROVE",
    module: "PRODUCTION",
    path: "/api/production/approve",
    details: `SalesOrder ${sales_order_id} → ProductionOrder ${prod.insertId}`,
  });

  return NextResponse.json({
    success: true,
    production_order_id: prod.insertId,
  });
}
