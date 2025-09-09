import ProductStockChart from './Products/ProductStockChart.jsx';
import ProductCountChart from './Products/ProductCountChart.jsx';
// import api from "../../Services/Api.js";
// import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  // const [countData, setCountData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const location = useLocation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const [countRes, stockRes] = await Promise.all([
  //         api.get('/admin/products/count-by-category'),
          
  //       ]);

  //       setCountData(countRes.data.data);
  //       setStockData(stockRes.data.data);
  //       console.log("Count:", countRes.data.data);
  //       console.log("Stock:", stockRes.data.data);
  //     } catch (err) {
  //       console.error("Error al obtener datos del dashboard:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [location]);

  // if (loading) return <p>Cargando datos...</p>;
const location = useLocation();

  return (
<div key={location.pathname} className="p-6">
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Bienvenido al panel de administración. Aquí verás estadísticas y accesos rápidos.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ProductStockChart height={300}  />
        <ProductCountChart height={300}  />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
