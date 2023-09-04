
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiCommentDetail } from 'react-icons/bi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const QuestionOne = () => {
  const { id } = useParams(); 
  const allQuestions = useSelector((state)=> state.Post.questions);
  const question = allQuestions.find((q) => q._id === id);
  // console.log(question);
 
  return (
    <div className="pt-20 h-screen w-full ">
      <div className="bg-black md:m-10 p-4 rounded-2xl flex flex-col gap-4 ">
        <div className="flex justify-around">
          <p>{formatDate(question.createdAt)}</p>
          <div className="text-base md:text-sm font-semibold">{question.difficulty}</div>
          <div className="text-base md:text-sm font-semibold">{question.category}</div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-bold">{question.name}</p>
          </div>
          <div>
            <p>
             {question.description}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 flex justify-between">
          <div className="my-2 mx-3 flex gap-2 hover:text-white">
            <Link to={`/getAnswers/${id}`}>
              <div className="flex flex-row gap-1">
                <div>
                  <BiCommentDetail className="m-1" />
                </div>
                <div> 20Answers</div>
              </div>
            </Link>
          </div>

          <div className="my-2 mx-3 flex gap-2 hover:text-white">
            <Link to={`/createAnswer/${question._id}`}>
              <div className="flex flex-row gap-1">
                <div>Answer</div>
                <div>
                  <IoMdAddCircleOutline className="m-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionOne;
