 /* eslint-disable */ 
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyAnswers = () => {
  const user = useSelector((state) => state.User.user);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const allQuestions = useSelector((state) => state.Post.questions);

  useEffect(() => {
    const handleMyAnswers = async () => {
      const res = await axios({
        method: 'GET',
        url: `https://college-club-website-client.vercel.app/answer/getAnswer_user/${user._id}`,
        withCredentials: true,
      });

      if (res.data.status === 'success') {
        const userAnswers = res.data.data.answers;

        // Now let's find the corresponding questions based on the `post` property in answers
        const questionsForAnswers = userAnswers.map((answer) => {
          const question = allQuestions.find((q) => q._id === answer.post);
          return question;
        });

        // Set the found answers and questions
        setAnswers(userAnswers);
        setQuestions(questionsForAnswers);
      }
    };

    handleMyAnswers();
  }, [user._id, allQuestions]);
  
  questions.map((question) => (
    console.log(question)
  ))

  return (
   
    <div className='pt-20 '>
    <div className='flex flex-col justify-center items-center md:flex-row'>
    {questions
      .filter((question) => question)
      .map((question) => (

  <div
    key={question._id}
    className="m-[60px] p-6 md:m-[10px] bg-black text-white rounded-xl mt-5 mx-5 "
  >
    <div className="m-2 md:m-4">
      <div className="flex flex-row justify-between">
        <div className="text-base md:text-sm font-semibold">{question.difficulty}</div>
        <div className="text-base md:text-sm font-semibold">{question.category}</div>
      </div>

      {question.name && ( // Check if question.name exists
        <div className='my-2'>
          <p className='text-lg font-bold'>{question.name}</p>
        </div>
      )}

      <div className="my-2 md:my-5">
        {question.description || 'Description not available'}
      </div>

      <div className="flex flex-row justify-center space-x-28 md:space-x-60 mt-5 text-sm md:text-base">
        <div className="flex items-end">
          <Link  to={`/questionOne/${question._id}`}  className="btn btn-primary">View</Link>
        </div>
      </div>
    </div>
  </div>
))}

    </div>
  </div>
  

  )
}

export default MyAnswers