import { Route,Routes } from "react-router-dom";
import Layouts from "../Components/layouts";
import React from 'react'
import Home from "../Pages/Home";


const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route  element={<Layouts/>}>
        <Route path="/" element={<Home/>}/>
        </Route>
    </Routes>
    </>
    
  )
}

export default AppRoutes;