import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../redux/slices/userSlice';
import { setLogoutPosts } from '../../redux/slices/postSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [DropDown, setDropDown] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const username = useSelector((state) => state.User.user?.name);

  useEffect(() => {
    const checkLogin = () => {
      if (username) {
        setUserLoggedIn(true);
      } else if (!username) {
        setUserLoggedIn(false);
      }
    };
    checkLogin();
  }, [username]);

  const handleLogOut = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://byte-solver-backend.onrender.com/user/logout',
        url:'http://localhost:3000/user/logout',
        withCredentials: true,
      });

      if (res.data.status === 'success') {
        alert('Logged out successfully!');
        setUserLoggedIn(false);
        dispatch(setLogout());
        dispatch(setLogoutPosts());
        navigate('/');
      }
    } catch (err) {
      alert('Please try again (not logged out)!!');
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-black fixed flex flex-row gap-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
            onClick={() => {
              setDropDown(!DropDown);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-8 md:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          {DropDown && (
            <ul
              tabIndex={0}
              className="menu menu-sm md:menu-lg dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52 border border-solid border-white "
            >
              <li>
                <Link to="/" onClick={() => setDropDown(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/questions" onClick={() => setDropDown(false)}>
                  Question
                </Link>
              </li>
              <li>
                <Link to="/events" onClick={() => setDropDown(false)}>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setDropDown(false)}>
                  About
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl mr-[10px]">
          Student @MIT
        </Link>
      </div>

      <div className="navbar-end ">
        {userLoggedIn && (
          <>
            <div className="font-bold md:text-lg text-md text-sm">
              {username}
            </div>
            <div
              className="dropdown dropdown-end mr-12 "
              onClick={() => setNav(!nav)}
            >
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-5 rounded-full md:h-8 md:w-8">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
                    alt="pic"
                  />
                </div>
              </label>

              {nav && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm md:menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-solid border-white"
                >
                  <li>
                    <Link
                      to="/profile"
                      className="justify-between"
                      onClick={() => setNav(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="shadow bg-base-100">
                    <Link
                      to="/login"
                      className="justify-between"
                      onClick={() => {
                        setNav(false);
                        handleLogOut();
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </>
        )}
        {!userLoggedIn && (
          <div>
            <Link to="/login" className="mr-4 font-bold text-lg">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
