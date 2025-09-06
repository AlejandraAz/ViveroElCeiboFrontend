import { useEffect, useState } from "react";
import api from "../../../Services/Api.js";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/api/admin/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Pedidos</h2>
      <table className="w-full border-collapse bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">N° Pedido</th>
            <th className="p-2 border">Cliente</th>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Monto Total</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td className="p-2 border">{o.id}</td>
              <td className="p-2 border">{o.customerName}</td>
              <td className="p-2 border">{new Date(o.createdAt).toLocaleDateString()}</td>
              <td className="p-2 border">{o.status}</td>
              <td className="p-2 border">${o.totalAmount}</td>
              <td className="p-2 border">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

