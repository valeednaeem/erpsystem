import db from '../../../lib/db.js';

export async function GET(req) {
  try {
    const results = await db.query('SELECT id, name, slug FROM departments ORDER BY name');
    return Response.json({ success: true, data: results });
  } catch (error) {
    console.error('[GET /api/departments] Error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, slug } = await req.json();

    if (!name || !slug) {
      return Response.json({ success: false, message: 'Name and slug are required' }, { status: 400 });
    }

    const result = await db.query(
      'INSERT INTO departments (name, slug) VALUES (?, ?)',
      [name, slug]
    );

    return Response.json({
      success: true,
      message: 'Department created successfully',
      data: { id: result.insertId, name, slug }
    }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/departments] Error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
