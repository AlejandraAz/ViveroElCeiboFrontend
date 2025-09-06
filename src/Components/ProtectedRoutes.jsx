import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";



const ProtectedRoutes = ({ children, role }) => {
    const {user} = useAuth();

    // Si no hay usuario logueado, redirige al login
    if (!user) return <Navigate to="/login" />;

    // Si el rol no coincide, redirige a su panel correspondiente
    if (role && user.rol !== role) {
        return user.rol === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/home" />;
    }
    return children
}

export default ProtectedRoutes