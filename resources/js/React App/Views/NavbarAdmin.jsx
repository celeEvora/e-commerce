import React from 'react'
import '../../../css/admin.css'
import logo from "../books.svg"
import { Link, Outlet, useNavigate } from 'react-router-dom';
import storage from '../../../Storage/storage';


function NavbarAdmin () {

    const go = useNavigate();
  
    async function logout(){
        try {
            const response = await axios.get('/logout')
            const { data } = response
            storage.remove('authUser');
            console.log(data)
            go('/');
        }catch (e){
            console.log(e)
        }finally {

        }
    }

    return (    
        <div className='admin-everything'>
            <div className="aside-bar">
                <div className="brandAdmin">
                    <img src={logo} />
                    <h1>BookStore</h1>
                </div>

                <div className="bottom">
                    <ul>
                        <div>
                            <li className='options'><Link to={`manage-products`} className='ManageOption'>Manage Products</Link></li>
                            <li className='options'><Link to={`manage-orders`} className='ManageOption'>Manage Orders</Link></li>
                            <li ><Link to={`manage-users`} className='ManageOption'>Manage Users</Link></li>
                            
                        </div>
                        <div id='sO'>
                            <li><Link to="/" id='SignOut'>Go to Home Page</Link></li>
                            <button className='SignOutAdmin' onClick={logout}>Sign Out</button>
                        </div>
                    </ul>
                    
                </div> 
            
            </div>
            <Outlet />
        </div>
    )
}

export default NavbarAdmin