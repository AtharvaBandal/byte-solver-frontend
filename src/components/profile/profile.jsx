import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import MyAnswers from '../answer/myAnswers'

const Profile = () => {
  const user = useSelector((state)=>state.User.user)
  
  return (
      <div className='pt-20 '>
        <div className='flex flex-col max-w-[1000px] mx-auto h-full'>
          <div className='flex justify-center items-center'>
            <p className='font-bold md:text-2xl'>Profile Page</p>
          </div>

          <div className=' p-6  m-[19px] text-white md:text-lg rounded-xl'>
            

              <div className='flex flex-col justify-center items-center gap-5 mr-[12px] '>
                <div className='flex flex-col gap-4 justify-center items-center mb-2'>
                  <img className='sm:w-[150px] w-[100px] rounded-full'  src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'  alt='pic'/>
                  <label className='font-bold' >{user.name}</label>
                </div>
              </div>
              <hr className='my-5 bg-gray100' />
              <span className='font-semibold flex flex-col gap-2 '>
              <p>Enrollment no - {user.enrollment}</p>
              <p>Year-            {user.year}</p>
              <p>Questions solved:- 6</p>
              </span>
           </div>

           <div className='flex justify-center items-center'>
            <p className='font-bold md:text-2xl'>My Questions</p>
          </div>
              
            <MyAnswers/>


          </div>

          
        
      </div>
  )
}

export default Profile