import { NextResponse } from "next/server";
import db from "@/lib/db";
import { requirePermission } from "@/lib/apiGuard";

export async function POST(req) {
  const guard = await requirePermission(req, "PRODUCTION_START");
  if (!guard.ok) return NextResponse.json(guard, { status: guard.status });

  const { production_order_id } = await req.json();

  const [materials] = await db.execute(
    `SELECT material_id, quantity FROM production_materials
     WHERE production_order_id = ?`,
    [production_order_id]
  );

  for (const m of materials) {
    await db.execute(
      `UPDATE inventory
       SET quantity = quantity - ?
       WHERE product_id = ?`,
      [m.quantity, m.material_id]
    );

    await db.execute(
      `INSERT INTO stock_movements
       (product_id, quantity, movement_type, reference)
       VALUES (?, ?, 'OUT', 'PRODUCTION')`,
      [m.material_id, m.quantity]
    );
  }

  return NextResponse.json({ success: true });
}
