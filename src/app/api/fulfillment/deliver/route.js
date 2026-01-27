export async function POST(req) {
  const { sales_order_id } = await req.json();

  await db.execute(`
    UPDATE shipments SET status='DELIVERED'
    WHERE sales_order_id=?
  `, [sales_order_id]);

  await db.execute(`
    UPDATE sales_orders
    SET status='DELIVERED'
    WHERE id=?
  `, [sales_order_id]);

  return NextResponse.json({ success: true });
}
