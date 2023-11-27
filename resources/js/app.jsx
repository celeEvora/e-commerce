import './bootstrap';
import App from './React App/App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,RouterProvider } from "react-router-dom"
import router from './router';
import axios from 'axios'

// window.axios = axios

// window.axios.defaults.baseURL = 'http://localhost:8000/'
// window.axios.defaults.headers.common['Accept'] = 'application/json'
// window.axios.defaults.headers.common['Content-Type'] = 'application/json'
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// window.axios.defaults.withCredentials = true


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
<React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
</React.StrictMode>
)