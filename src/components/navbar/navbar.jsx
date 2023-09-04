/* eslint-disable */ 
import React, {useState,useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux';
import {  setLogout } from '../../redux/slices/userSlice';
import { setLogoutPosts } from '../../redux/slices/postSlice';
// import logo from '../../assests/logo.jpeg'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [nav,setNav] = useState(false);
  const [DropDown,setDropDown] = useState(false); 
  const [userLoggedIn,setuserLoggedIn] = useState(false);
  const username = useSelector((state) => state.User.user?.name)
   
    useEffect(()=>{
      const checkLogin = () => {
        if (username) {
          setuserLoggedIn(true);
        } else if (!username) {
          setuserLoggedIn(false);
        }
      };
      checkLogin();
    })
 
  

  const  handleLogOut = async()=>{
    try{
      const res = await axios({
        method:'GET', 
        url:'https://student-club-website-api12.vercel.app/user/logout',
        withCredentials: true
      });

      if(res.data.status==="success"){
          alert('logged Out successfully !');
          setuserLoggedIn(false);
          dispatch(setLogout()); 
          dispatch(setLogoutPosts());
          navigate("/");
        }
  
    }catch(err){
      alert('Please try Again (not logged out)!!')   
      console.log(err);
    }

  }
  


  

  return (
      
    <div className="navbar bg-black fixed ">
      
      <div className="navbar-start "  onClick={()=>{setDropDown(!DropDown)}}>
        <div className="dropdown ">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          {DropDown && (
            <ul tabIndex={0} className="menu menu-sm md:menu-lg dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52 border border-solid border-white ">
              <li><Link to='/'  onClick={()=>{setDropDown(false)}}>Home</Link></li>
              <li><Link to='/questions'  onClick={()=>{setDropDown(false)}}>Question</Link> </li>
              <li><Link to='/events'  onClick={()=>{setDropDown(false)}}>Events</Link></li>
              <li><Link to='/about'  onClick={()=>{setDropDown(false)}}>About</Link></li>
              
          </ul>)}
        </div>
      </div>

    <div className="navbar-center">
      <Link to='/' className="btn btn-ghost normal-case text-xl mr-[10px]">Student  @MIT</Link>
    </div>

    
    <div className="navbar-end  ">
    { userLoggedIn &&  (
      <>
      <div className='font-bold md:text-lg text-md hidden md:block'>{username}</div>
      <div className="dropdown dropdown-end md:mr-12 mr-32 "onClick={()=>setNav((!nav))}>
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-5 rounded-full md:h-8 md:w-8" >
            <img src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'  alt='pic' />
          </div>
        </label>
        
        {nav && (
          <ul tabIndex={0} className="menu menu-sm md:menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-solid border-white">
            <li >
                <Link 
                  to='/profile' className="justify-between"
                  onClick={()=>setNav((false))}>
                    Profile
                </Link>
                
            </li>
            
        
            <li className='shadow bg-base-100  '>
              <Link 
              
                to='/login' className="justify-between"  
                onClick={() => {
                  setNav(false);
                  handleLogOut()
                }}
                >
                logout

              </Link>
            </li>
          </ul>
        )}
      </div>
      </>
    )} 
    { !userLoggedIn && (
      <div>
        <Link 
          to='/login' className="mr-4 font-bold text-lg "
        >
          Login
        </Link>
      </div>
    )}
    </div>
    </div>        
  )
}

export default Navbar;