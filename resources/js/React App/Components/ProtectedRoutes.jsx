import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import storage from '../../../Storage/storage'

export const ProtectedRoutes = ({ admin }) => {

    
    // const authUser = storage.get('authUser');

    // const authUser = storage.get('authUser').is_admin;
    // if(!authUser == 1) {
    //     return <Navigate to='/' />
    // }
    // return <Outlet />

    const authUser = storage.get('authUser');

    // Check if authUser is null
    if (!authUser) {
        alert('You need to be authenticated')
        return <Navigate to='/login' />;
    }

    // Check for admin
    const authAdmin = authUser.is_admin;
    if (admin && !authAdmin) {
        return <Navigate to='/' />;
    }

    return <Outlet />;
}

export default ProtectedRoutes
