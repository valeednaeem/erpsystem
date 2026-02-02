
import { NextResponse } from "next/server";
import { execute } from "@/lib/db";
import { requirePermission } from "@/lib/apiGuard";
import { logActivity } from "@/lib/activityLogger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


// GET: list sales orders
export async function GET(req) {
  const auth = await requirePermission(req, "SALES_VIEW");
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const [rows] = await db.execute(`
    SELECT so.id, so.order_date, so.status, c.name AS customer
    FROM sales_orders so
    LEFT JOIN customers c ON so.customer_id = c.id
    ORDER BY so.id DESC
  `);

  return NextResponse.json(rows);
}

// POST: create sales order
// export async function POST(req) {
//   const auth = await requirePermission(req, "SALES_CREATE");
//   if (!auth.ok) {
//     return NextResponse.json({ error: auth.error }, { status: auth.status });
//   }

//   const { customer_id } = await req.json();

//   const [result] = await db.execute(
//     `INSERT INTO sales_orders (customer_id, order_date, status)
//      VALUES (?, CURDATE(), 'pending')`,
//     [customer_id]
//   );

//   await logActivity(auth.userId, "CREATE", "sales_orders", result.insertId);

//   return NextResponse.json({
//     id: result.insertId,
//     status: "pending",
//   });
// }


export async function POST(req) {
  const body = await req.json();

  if (!body.customer_id) {
    return NextResponse.json(
      { error: "customer_id required" },
      { status: 400 }
    );
  }

  await db.query(
    "INSERT INTO sales_orders (customer_id, status) VALUES (?, 'PENDING')",
    [body.customer_id]
  );

  return NextResponse.json({ success: true });
}