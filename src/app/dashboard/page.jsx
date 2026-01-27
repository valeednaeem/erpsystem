"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const res = fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            customer_id: 1,
        }),
    });

    // const data = res.json(); // ✅ now safe

    return (
        <div className="container mt-4">
        <h2>ERP Dashboard</h2>

        <table className="table table-striped mt-3">
            <thead>
            <tr>
                <th>ID</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(o => (
                <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}
