import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
// import {sendRequestWithToken} from '../../../functions'
import storage from '../../../Storage/storage';
import '../../../css/login.css'


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const go = useNavigate();

    const login = async(e) =>{
        e.preventDefault();
        const form = {email:email,password:password};
        
        try {
            const response = await axios.post('/login', form)
            const { data } = response
            console.log(data)
            storage.set('authUser', data.user);
            go('/');
            
        } catch (e) {
            console.log(e)
        }


    }

    

    useEffect(function (){
        axios.get('/sanctum/csrf-cookie');
    }, [])

    return (
        
        <div className='containerForm'>
        <form id="loginForm" onSubmit={login}>
           <h1>Sign in or Create an Account</h1>
            <label>Email</label>
            <div className='inputs'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path id="u" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>        
                <input 
                type="email" 
                id="email"
                name="email" 
                placeholder='Type your email' 
                required='required' 
                onChange={ (e)=> setEmail(e.target.value)} />
            </div>

            <label>Password</label>
            <div className='inputs'>   
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path id='p' d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>
                <input 
                type="password" 
                id="password"
                name="password"
                placeholder='Type your password'
                required='required' 
                onChange={ (e)=> setPassword(e.target.value)} />
            </div>
            <a href='#' id='ForgotPass'>Forgot Password?</a>
            <button type="submit">LOGIN</button>

            <Link to="/signup" id='SignUp'>Or Sign up</Link>
        </form>
        </div>
    )
}

export default Login