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

  const handleLogin = async()=>{
   
    try{
      const res = await axios({
        method: 'POST',
        url:'https://college-club-website-client.vercel.app/user/login',
        data:{
          email,
          password:pwd
        },
        withCredentials: true
      })
      if(res.data.status==="success"){
          alert('Sucessfully logged in');
          dispatch(setLogin({user: res.data.data.User}));
          navigate("/");
       }
  
    }catch(err){
      alert('Please try Again!!')   
      console.log(err);
    }
  }

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