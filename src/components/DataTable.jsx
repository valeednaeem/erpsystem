'use client';

export default function DataTable({ headers, data, onView, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx}>
                {headers.map((header) => (
                  <td key={`${idx}-${header}`}>{row[header]}</td>
                ))}
                <td>
                  {onView && (
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => onView(row)}
                      title="View"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  )}
                  {onEdit && (
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => onEdit(row)}
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(row)}
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length + 1} className="text-center text-muted py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
