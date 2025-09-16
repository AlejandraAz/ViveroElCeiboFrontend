import { Route, Routes, Navigate } from "react-router-dom";
import Layouts from "../layouts/Layouts.jsx";
import React from "react";
import Home from "../Pages/Home/HomePage.jsx";
import LoginPage from "../Pages/Auth/LoginPage.jsx";
import RegisterPage from "../Pages/Auth/RegisterPage";
import AdminLayout from "../layouts/AdminLayout.jsx";
import Dashboard from "../Pages/Admin/Dashboard.jsx";
import UsersPage from "../Pages/Admin/Users/UsersPage.jsx";
import ProductsPage from "../Pages/Admin/Products/ProductsPage.jsx";
import OrdersPage from "../Pages/Admin/Orders/OrdersPage.jsx";
import ProtectedRoutes from "../Components/ProtectedRoutes.jsx";
import CategoriesPage from "../Pages/Admin/Categories/CategoriesPage.jsx";
import ProfilePage from "../Pages/Customer/ProfilePage.jsx";
import OrderCustomerPage from "../Pages/Customer/OrderCustomerPage.jsx";
import CustomerLayout from "../layouts/CustomerLayout.jsx";
import CartPage from "../Pages/Customer/CartPage.jsx";
import UserCreate from "../Pages/Admin/Users/UserCreate.jsx";
import AdminsPage from "../Pages/Admin/admins/AdminsPage.jsx";
import NotFound from "../Pages/NotFound.jsx";
import UnauthorizedPage from "../Pages/UnauthorizedPage.jsx";
import SearchResultsPage from "../Components/SearchResultsPage.jsx";
import ProductDetailPage from "../Pages/Public/ProductDetailPage.jsx";

const AppRoutes = () => {
  return (
    <>

      <Routes>
        {/* Rutas públicas con layout general */}
        <Route element={<Layouts />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchResultsPage/>}/>
          <Route path="/product/:id" element={<ProductDetailPage />} />

        </Route>

        {/* Rutas Cliente */}
          <Route element={<ProtectedRoutes role="cliente" />}>
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrderCustomerPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Route>

        {/* Rutas protegidas de admin */}
        <Route element={<ProtectedRoutes role="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="create-user" element={<UserCreate />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="categories" element={<CategoriesPage />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        {/* aca lo escribo p/llamarlo del Link de ProfilePage */}
        <Route path="/404" element={<NotFound />} />  
        {/* Ruta por defecto para 404 */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
