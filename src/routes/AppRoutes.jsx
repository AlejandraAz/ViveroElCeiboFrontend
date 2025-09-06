import { Route, Routes } from "react-router-dom";
import Layouts from "../Components/Layouts.jsx";
import React from 'react'
import Home from "../Pages/Home/HomePage.jsx";
import LoginPage from "../Pages/Auth/LoginPage.jsx";
import RegisterPage from "../Pages/Auth/RegisterPage";
import AdminLayout from "../layouts/AdminLayout.jsx";
import Dashboard from "../Pages/Admin/Dashboard.jsx";
import UsersPage from "../Pages/Admin/Users/UsersPage.jsx";
import ProductsPage from "../Pages/Admin/Products/ProductsPage.jsx";
import OrdersPage from "../Pages/Admin/Orders/OrdersPage.jsx";
import ProtectedRoutes from "../Components/ProtectedRoutes.jsx";
import CategoriesPage from '../Pages/Admin/Categories/CategoriesPage.jsx'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* envuelvo la rutas publicas con layout para que en todas se vea el navbar */}
        <Route element={<Layouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>



 {/* Rutas Cliente */}
        {/* <Route
          path="/home"
          element={
            <ProtectedRoute role="cliente">
              <ClienteHome />
            </ProtectedRoute>
          }
        /> */}


        {/* Rutas de admin  las envuelvo a todas en el adminLayout*/}
        <Route path="/admin" element={<ProtectedRoutes role="admin"><AdminLayout /></ProtectedRoutes>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="products" element={<ProductsPage/>}/>
          <Route path="orders" element={<OrdersPage/>}/>
          <Route path="categories" element={<CategoriesPage/>}/>
          {/* <Route path="orders" element={<OrdersPage />} />  */}
        </Route>
      </Routes>
    </>

  )
}

export default AppRoutes;