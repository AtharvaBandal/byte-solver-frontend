/* eslint-disable */
import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import MyAnswers from '../answer/otherAnwer'

import { useParams } from 'react-router-dom';
import axios from 'axios';

const OtherProfile = () => {
    const [user, setUser] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const getOtherUser = async () => {
      const res = await axios({
        method: 'GET',
        url: `http://localhost:3000/user/findUser/${id}`,
      });
      if (res.data.status === 'success') {
        setUser(res.data.data.currentUser)
        
       
        // console.log(user);
      }
    };
    getOtherUser();
  }, []);


  return (
    <div className='pt-20 '>
      <div className='flex flex-col max-w-[1000px] mx-auto h-full'>
        <div className='flex justify-center items-center'>
          <p className='font-bold md:text-2xl'>Profile Page</p>
        </div>

        <div className=' p-6  m-[19px] text-white md:text-lg rounded-xl'>
          <div className='flex flex-col justify-center items-center gap-5 mr-[12px] '>
            <div className='flex flex-col gap-4 justify-center items-center mb-2'>
              <img
                className='sm:w-[150px] w-[100px] rounded-full'
                src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
                alt='pic'
              />
              <label className='font-bold'>{user?.name}</label>
            </div>
          </div>
          <hr className='my-5 bg-gray100' />
          <span className='font-semibold flex flex-col gap-2 '>
            <p>Enrollment no - {user?.enrollment}</p>
            <p>Year- {user?.year}</p>
            <p>Questions solved: {user?.answers?.length || 0}</p>
          </span>
        </div>

        <div className='flex justify-center items-center'>
          <p className='font-bold md:text-2xl'>{user?.name}'s Questions</p>
        </div>
        <div className='w-full'>

           <MyAnswers 
           user={user?._id}
           />
       
        </div>
        </div>
                
    </div>

  );
};

export default OtherProfile;
