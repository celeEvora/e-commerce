import React, {useEffect, useState} from 'react';
import '../../css/app.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainPage from "./Views/main-page";
import Login from './Components/login';
import SignUp from './Components/signup';
import NavbarAdmin from './Views/NavbarAdmin';
import ManageProducts from './Components/ManageProducts';
import ManageUsers from './Components/ManageUsers';
import ManageOrders from './Components/ManageOrders';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Navbar from './Components/navbar';

function App() {

    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={ <Login /> } />
                <Route path="/signup" element={ <SignUp /> } />
                <Route path='/Navbar' element={ <Navbar />} />


                <Route element={<ProtectedRoutes />}>
                    {/* <Route path="/admin" element={ <NavbarAdmin /> } /> */}
                    <Route path="/admin/manage-products" element={ <ManageProducts /> } />
                    <Route path="/admin/manage-users" element={ <ManageUsers /> } />
                </Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App