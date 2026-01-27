export async function POST(req) {
  const { sales_order_id, courier } = await req.json();

  await db.execute(`
    INSERT INTO shipments (sales_order_id, courier, status)
    VALUES (?, ?, 'SHIPPED')
  `, [sales_order_id, courier]);

  await db.execute(`
    UPDATE sales_orders
    SET status = 'SHIPPED'
    WHERE id = ?
  `, [sales_order_id]);

  return NextResponse.json({ success: true });
}
