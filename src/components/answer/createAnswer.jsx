import axios from 'axios';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';
import { setLogin,updateUser } from '../../redux/slices/userSlice';

const Answer = () => {
  const user = useSelector((state) => state.User.user);
  const [answer, setAnswer] = useState('');
  const [language, setLanguage] = useState(''); 
  const navigate = useNavigate()
  const { id } = useParams(); 
  const dispatch = useDispatch();


 
  const handleAnswerSubmission = async () => {
    try {
      const res = await axios({
        method: 'POST',
        // url: `https://byte-solver-backend.onrender.com/answer/submitAnswer/${user_id}`,
        url:`http://localhost:3000/answer/submitAnswer/${user._id}`,
        data: {
          post: id,
          text: answer,
          language: language,
        },
      });
        console.log(res);
      if (res.data.status === 'success') {
       
        alert('Answer was successfully submitted');
        
        dispatch(setLogin({user:res.data.data.user }));
        navigate(`/questionOne/${id}`);

      } 
      setAnswer('');
      setLanguage('');
    } catch (error) {
    
      console.error('An error occurred:', error);

     
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="pb-5 px-3 md:pt-32 pt-24">
      <div className="text-2xl font-bold text-center mb-4">
        Give Your answer here:
      </div>
      <div className="mb-4">
        <textarea
          className="bg-black text-2xl w-full p-3"
          rows="10"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer..."
        ></textarea>
      </div>
      <div className="mb-4">
        {/* Wrap the input field and label in a div with a specific class */}
        <div className="language-input-container">
          <input
            className="bg-black text-2xl p-3"
            type="text"
            placeholder="Enter Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>
      </div>
      <div className="text-center">
        <button
          className="btn bg-gray-300 text-black hover:text-white text-xl "
          onClick={handleAnswerSubmission}
        >
          Submit
        </button>
      </div>
    </div>


  );
};

export default Answer;
