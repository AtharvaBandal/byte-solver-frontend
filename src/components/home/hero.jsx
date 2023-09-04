import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="pt-20 h-screen flex justify-center items-center">
      <div className="text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Welcome to our Community
            We are providing the basic knowledge about GFG by conducting "Events", "Competitions" and "Workshops" at our Campus
          </p>
          <Link to={'/questions'} className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
