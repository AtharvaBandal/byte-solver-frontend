import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [year, setYear] = useState('');
  const [enrollment, setEnrollment] = useState('');

  const handleSignup = async () => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://college-club-website-client.vercel.app/user/signup',
        data: {
          name,
          email,
          password,
          passwordConfirm,
          year,
          enrollment, // Include year and enrollment in the signup data
        },
        withCredentials: true,
      });

      if (res.data.status === 'success') {
        alert('Successfully signed up!'); 
        navigate('/login');
      }
    } catch (err) {
      alert('Please try again (create account)!!');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 pt-32">
      <div className="flex-col lg:flex-row-reverse px-5">
        <div className="text-center ">
          <h1 className="md:text-6xl text-4xl font-bold mb-5">Sign up now!</h1>
        </div>
        <div className="flex-shrink-0 shadow-2xl bg-base-100 mx-auto p-5 rounded-lg md:w-1/3">
          <div className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Year</span>
              </label>
              <input
                type="text"
                placeholder="Year"
                className="input input-bordered"
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Enrollment Number</span>
              </label>
              <input
                type="text"
                placeholder="Enrollment Number"
                className="input input-bordered"
                onChange={(e) => setEnrollment(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-6 flex flex-col justify-center items-center gap-5">
              <button className="btn btn-primary" onClick={handleSignup}>
                Sign up
              </button>
              <p>or</p>
              <Link to="/login">Login instead</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
