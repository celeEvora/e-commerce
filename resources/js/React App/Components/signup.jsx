import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/login.css';
import logo from "../books.svg"


function SignUp() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
  });

  const go = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();
console.log(formData)
    try {
      const response = await axios.post('/register', formData);
    console.log(response)
      if (response.status === 201) {
        go('/login');
      }
    } catch (error) {
      console.error('Error al registrar el usuario', error);
    }
  };

  useEffect(() => {
    axios.get('/sanctum/csrf-cookie');
  }, []);

  return (
    <div className='containerForm'>
      <div className="brand">
                <Link to='/'>
                    <img src={logo} />
                    <h1>BookStore</h1>
                </Link>
                </div>
      <form id='loginForm' onSubmit={register}>
        <h1>Create an Account</h1>
        <div className='names'>
          <div className='contains'>
            <label>First name</label>
            <div className='inputs'>
              <input
                type='text'
                id='first_name'
                name='first_name'
                required='required'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='contains'>
            <label>Last name</label>
            <div className='inputs'>
              <input
                type='text'
                id='last_name'
                name='last_name'
                required='required'
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <label>Phone</label>
        <div className='inputs'>
          <input
            type='text'
            id='phone'
            name='phone'
            required='required'
            onChange={handleChange}
          />
        </div>

        <label>Email</label>
        <div className='inputs'>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Type your email'
            required='required'
            onChange={handleChange}
          />
        </div>
        <label>Password</label>
        <div className='inputs'>
          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 576 512'>
            <path
              id='p'
              d='M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z'
            />
          </svg>
          <input
            type='password'
            id='password'
            name='password'
            required='required'
            onChange={handleChange}
          />
        </div>

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
