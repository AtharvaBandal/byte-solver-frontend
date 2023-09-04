 /* eslint-disable */ 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


import { Link, useParams } from 'react-router-dom';




const AnswersList = () => {
  const [answers, setAnswers] = useState([]);
  const { id } = useParams(); 


  const allQuestions = useSelector((state) => state.Post.questions);
  const question = allQuestions.find((q) => q._id === id);


 
  
  useEffect(() => {
    const handleAnswers = async () => {
      const res = await axios({
        method: 'GET',
        url: `https://student-club-website-api12.vercel.app/answer/getAllAnswers/${id}`,
        withCredentials: true,
      });
    //  console.log(res.data.data.answers[0].user.name);
      if (res.data.status === 'success') {
        setAnswers(res.data.data.answers);
      }
    };
  
    handleAnswers();
  }, []);

 
    

  return (
    <div className="pt-20 h-screen w-full ">
    {/* question */}
    <div className="bg-black m-5 md:m-10 p-4 rounded-2xl flex flex-col gap-3">
      <p className="font-bold text-center md:text-left">Question</p>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-lg font-bold">{question.name}</p>
        </div>
        <div>
          <p>{question.description}</p>
        </div>
      </div>
    </div>
  
    {/* Answers */}
    <div className="bg-black m-5 md:m-10 p-4 rounded-2xl flex flex-col gap-3">
      <p className="font-bold text-center md:text-left">Answers</p>
  
      {answers.map((answer) => (
        <div key={answer._id} className="flex flex-col gap-2">
          <div>
            <p className="text-lg font-bold">{answer.text}</p>
            <Link className="text-center md:text-left bg-white text-black btn hover:text-white">Answered by: {answer.user.name}</Link>
            {/* Add more information about the answer if needed */}
          </div>
        </div>
      ))}
    </div>
  </div>
  
  )
};

export default AnswersList;