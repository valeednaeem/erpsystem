export async function POST(req) {
  const { product_id, warehouse_id, bin_id, quantity } =
    await req.json();

  await db.execute(`
    INSERT INTO warehouse_stock
    (warehouse_id, bin_id, product_id, quantity)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
  `, [warehouse_id, bin_id, product_id, quantity]);

  await db.execute(`
    INSERT INTO stock_movements
    (product_id, quantity, movement_type, reference)
    VALUES (?, ?, 'IN', 'PRODUCTION_OUTPUT')
  `, [product_id, quantity]);

  return NextResponse.json({ success: true });
}
