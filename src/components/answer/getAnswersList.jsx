/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';

const AnswersList = () => {
  const user = useSelector((state) => state.User.user);
  const [answers, setAnswers] = useState([]);
  const { id } = useParams();
  const allQuestions = useSelector((state) => state.Post.questions);
  const question = allQuestions.find((q) => q._id === id);
  const navigate = useNavigate();

  const updateStatus = async (ans_id, status) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `https://byte-solver-backend.onrender.com/answer/giveStatus/${ans_id}`,
        url: `http://localhost:3000/answer/giveStatus/${ans_id}`,
        data: {
          email: user.email,
          status: status,
        },
      });
      if (res.data.status === 'success') {
        // Find the answer in the state and update its status
        setAnswers((prevAnswers) =>
          prevAnswers.map((answer) =>
            answer._id === ans_id ? { ...answer, status: status } : answer
          )
        );
        alert('Status updated');
      }
    } catch (error) {
      alert('Something went wrong while giving status');
    }
  };

  useEffect(() => {
    const handleAnswers = async () => {
      const res = await axios({
        method: 'GET',
        url: `https://byte-solver-backend.onrender.com/answer/getAllAnswers/${id}`,
        url: `http://localhost:3000/answer/getAllAnswers/${id}`,
        withCredentials: true,
      });
      if (res.data.status === 'success') {
        setAnswers(res.data.data.answers);
        console.log(res.data.data.answers);
      }
    };
    handleAnswers();
  }, []);

  return (
    <div className="pt-20 h-full w-full">
      {/* question */}
      <div className="bg-black m-5 md:m-10 p-4 rounded-2xl flex flex-col gap-3 overflow-hidden">
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
      <div className="m-5 md:m-10 p-4  flex flex-col gap-3">
        <p className="font-bold text-center md:text-left">Answers</p>

        {answers.map((answer) => (
          <div key={answer._id} className="bg-black  m-5 md:m-10 p-4 rounded-2xl flex flex-col gap-2">
            <div className="">
              <p className="text-lg font-bold my-4 overflow-hidden">{answer.text}</p>
              <div className="flex flex-row justify-between">
                {/* <Link to={`/getOtherProfile/${answer.user._id}`} className="text-center md:text-left text-white font-semibold"> */}
                <Link className="text-center md:text-left text-white font-semibold">
                  Answered by: {answer.user.name}
                </Link>
                {user?.roles === 'admin' && (
                  <div className="my-3">
                    <label htmlFor={`status-${answer._id}`} className="text-white font-bold">
                      Status:
                    </label>
                    <select
                      id={`status-${answer._id}`}
                      className="bg-black text-white p-2 rounded"
                      value={answer.status}
                      onChange={(e) => {
                        updateStatus(answer._id, e.target.value);
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="font-bold">{answer.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswersList;
