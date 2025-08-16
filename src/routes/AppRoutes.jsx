import { Route,Routes } from "react-router-dom";
import Layouts from "../Components/layouts";
import React from 'react'
import Home from "../Pages/Home";
import RegisterPage from "../Pages/RegisterPage";
import LoginPage from "../Pages/LoginPage";

const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route  element={<Layouts/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        </Route>
    </Routes>
    </>
    
  )
}

export default AppRoutes;