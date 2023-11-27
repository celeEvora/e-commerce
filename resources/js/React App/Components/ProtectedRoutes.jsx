import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import storage from '../../../Storage/storage'

export const ProtectedRoutes = ({ children }) => {

    
    // const authUser = storage.get('authUser');
    const authUser = storage.get('authUser').is_admin;
    if(!authUser == 1) {
        return <Navigate to='/' />
    }
    return <Outlet />
}

export default ProtectedRoutes
