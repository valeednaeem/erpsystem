export async function POST(req) {
  const { production_order_id } = await req.json();

  await db.execute(`
    UPDATE sales_orders so
    JOIN production_orders po ON po.sales_order_id = so.id
    SET so.status = 'READY_FOR_SHIPMENT'
    WHERE po.id = ?
  `, [production_order_id]);

  return NextResponse.json({ success: true });
}
