import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useState } from 'react';
import { setLogin } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [pwd, setPwd] = useState();

  const handleLogin = async () => {
    // Validate email and password
    if (!email || !pwd) {
      alert('Please fill in both email and password fields.');
      return;
    }
  
    // Show loading indicator
    // You can set a loading state here
  
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://byte-solver-backend.onrender.com/user/login',
        url:`http://localhost:3000/user/login`,
        data: {
          email,
          password: pwd,
        },
        withCredentials: true,
      });
  
      if (res.data.status === 'success') {
        alert('Successfully logged in');
        // Dispatch the user action and navigate
        dispatch(setLogin({ user: res.data.data.User }));
        navigate('/questions');
      } else {
        // Handle login failure
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      // Handle network errors or other unexpected errors
      console.error(err);
      alert('An error occurred while logging in. Please try again later.');
    } finally {
      // Hide loading indicator
      // You can clear the loading state here
    }
  };
  

  return (
    <div className="min-h-screen bg-base-200 pt-32">
      <div className="flex-col lg:flex-row-reverse px-5">
        <div className="text-center ">
          <h1 className="md:text-6xl text-4xl font-bold mb-5">Login now!</h1>
        
        </div>
        <div className="flex-shrink-0 shadow-2xl bg-base-100 mx-auto p-5 rounded-lg md:w-1/3">
          <div className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" onChange={(e)=> setEmail(e.target.value)} required/>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" onChange={(e)=> setPwd(e.target.value)} required/>  
            </div>
            <div className="form-control mt-6 flex flex-col justify-center items-center gap-5">
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
              <p>or</p>
              <Link to='/signup'>
                  Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login