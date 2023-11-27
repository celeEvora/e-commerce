import { BrowserRouter, createBrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from "react";


import MainPage from "./React App/Views/main-page";
import Navbar from './React App/Components/navbar';
import Login from './React App/Components/login';
import SignUp from './React App/Components/signup';
import NavbarAdmin from './React App/Views/NavbarAdmin';
import ManageProducts from './React App/Components/ManageProducts';
import ManageUsers from './React App/Components/ManageUsers';
import ManageOrders from './React App/Components/ManageOrders';
import EditSaveForm from './React App/Components/edit-save';
import ProtectedRoutes from './React App/Components/ProtectedRoutes';



const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        
    },
    
    {
        path: 'login',
        element: <Login />
    },
    
    {
        path: 'signup',
        element: <SignUp />
    },
    

    {
      path: 'admin',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/admin',
          element: <NavbarAdmin />,
          children: [
              
              {
                  path: 'manage-products',
                  element: <ManageProducts />
              }, 
              {
                  path: 'manage-orders',
                  element: <ManageOrders />
          
              },
              {
                  path: 'manage-users',
                  element: <ManageUsers />
              }

          ]
      }
    ]
  }

])




export default router;