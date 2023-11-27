import logo from "../books.svg"
import '../../../css/navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import storage from '../../../Storage/storage';


const endpoint = '/genres'
const Navbar = ({searcher, search}) => {

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

    const [genres, setGenres] = useState([]) 
    
    async function ShowGenres(signal) {
        try {
            const response = await fetch(`${endpoint}`);
            if (!response.ok) throw new Error(response.statusText)
            const data = await response.json();
            setGenres(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect ( ()=> {
        const abortController = new AbortController()
        const abortSignal = abortController.signal
        ShowGenres(abortSignal)
        return function () {
            abortController.abort()
        }
    }, [])


    return (
        
        <div className="navbar">
            <div className="container">
                <div className="brand">
                <img src={logo} />
                <h1>BookStore</h1>
                </div>

                <div className="search">
                    <input 
                    value={search} 
                    onChange={searcher} 
                    className="input-search" 
                    type="text" 
                    placeholder="Search by tittle, author, ISBN or keyword"
                    />
                    <button className="button-search" type="submit"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path id="lupa" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></button>                
                </div>


                { storage.get('authUser') ? (
                    <div className="right">
                        
                        <div><p>Hola, {storage.get('authUser').first_name}</p></div>

                        <div>{storage.get('authUser').is_admin == 1 && (
                            <Link to="/admin" id="admin-dashboard">Admin Dashboard</Link>
                        )}</div>

                        <div><button id="logout" onClick={logout}>Sign Out</button></div>
                        <div><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <style>svg{"fill:#1f1f1f"}</style>
                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg></div>
                    </div>
                ): (
                    <div className="right">
                      
                      <Link to="/login">Sign In</Link>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <style>svg{"fill:#1f1f1f"}</style>
                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg>
                    </div>
                  )}

            </div>
            <div className="sub-navbar">
                <ul className="categoryUl">
                    <li className="has-dropdown">More genres!
                        <div className="dropdown-menu">
                            <ul className="categoryUl">
                                <div className="dropdown-menu-div">
                                    {genres.map(genre => (
                                        
                                        <li key={genre.genre_id} className="dropdown-menu-li">{genre.name}</li>
                                        
                                    ))}
                                </div>      
                            </ul>
                        </div>
                    </li>
                    <li><Link to="/login" className="category">Fiction</Link></li>
                    <li><Link to="/login" className="category">Fantasy</Link></li>
                    <li><Link to="/login" className="category">Action</Link></li>
                    <li><Link to="/login" className="category">Romance</Link></li>
                    <li><Link to="/login" className="category">Teen</Link></li>
                    <li><Link to="/login" className="category">Kids</Link></li>
                </ul>
            </div>        
        </div>
        
    )
}

export default Navbar