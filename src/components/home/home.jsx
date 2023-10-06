 /* eslint-disable */ 
import { useEffect, useState } from 'react';
import React from 'react';
import Hero from './hero';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setQuestion } from '../../redux/slices/postSlice';
import { useNavigate } from 'react-router-dom';
import { render } from 'react-dom';

const Home = () => {
  const dispatch = useDispatch();
  const [renderReady, setRenderReady] = useState(false);
  const navigate = useNavigate();

  
  

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url:  'https://byte-solver-backend.onrender.com/post/getAllPost',
           url: 'http://localhost:3000/post/getAllPost',
          withCredentials: true,
        });

        if (res.data.status === 'success') {
          const questions = res.data.data.posts.reverse();
          dispatch(setQuestion({ questions: questions }));
          setRenderReady(true); 
        }
      } catch (error) {
        console.log('Something went wrong while getting questions:\n', error);
        navigate('/');
      }
    };

    getAllQuestions();
  }, []); // Make sure to include dispatch in the dependency array


  
  return (
    <>
      <div className='h-screen' style={{ display: 'grid', placeItems: 'center' }}>
        

        {!renderReady ? (
          
          <div className='flex flex-col justify-center items-center mt-40'>
            <p className=''>Backend Loading...</p>
            <span className="loading loading-dots loading-lg">
              <Hero />
            </span>
          </div>

        ) : (
          <Hero />
        )}
      </div>
    </>
  );
};

export default Home;
