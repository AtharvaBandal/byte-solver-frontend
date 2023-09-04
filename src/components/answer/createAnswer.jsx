import axios from 'axios';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';

const Answer = () => {
  const user_id = useSelector((state) => state.User.user?._id);
  const [answer, setAnswer] = useState('');
  const [language, setLanguage] = useState(''); 
  const navigate = useNavigate()
  const { id } = useParams(); 



 
  const handleAnswerSubmission = async () => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'https://college-club-website-client.vercel.app/',
        data: {
          user: user_id,
          post: id,
          text: answer,
          language: language,
        },
      });

      if (res.data.status === 'success') {
        // Show a success message in the UI
        alert('Answer was successfully submitted');

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
