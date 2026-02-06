import db from '../../../../lib/db.js';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const results = await db.query('SELECT id, name, slug FROM departments WHERE id = ?', [id]);

    if (results.length === 0) {
      return Response.json({ success: false, message: 'Department not found' }, { status: 404 });
    }

    return Response.json({ success: true, data: results[0] });
  } catch (error) {
    console.error('[GET /api/departments/[id]] Error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name, slug } = await req.json();

    if (!name || !slug) {
      return Response.json({ success: false, message: 'Name and slug are required' }, { status: 400 });
    }

    const result = await db.query(
      'UPDATE departments SET name = ?, slug = ? WHERE id = ?',
      [name, slug, id]
    );

    if (result.affectedRows === 0) {
      return Response.json({ success: false, message: 'Department not found' }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Department updated successfully',
      data: { id, name, slug }
    });
  } catch (error) {
    console.error('[PUT /api/departments/[id]] Error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const result = await db.query('DELETE FROM departments WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return Response.json({ success: false, message: 'Department not found' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Department deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/departments/[id]] Error:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
