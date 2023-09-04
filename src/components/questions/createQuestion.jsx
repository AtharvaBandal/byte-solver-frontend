import React, { useState } from 'react';
import axios from 'axios';
import { useSelector} from 'react-redux';
import { useNavigate} from "react-router-dom";
import { UseSelector, useDispatch} from 'react-redux';
import { setQuestion, addQuestion } from '../../redux/slices/postSlice';


const CreateQuestion = () => {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('Strings'); 
  const [difficulty, setDifficulty] = useState('Easy'); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const email = useSelector((state) => state.User.user?.email);
  const handleQuestionSubmission = async () => {
    try {
        
      const response = await axios.post(
        'https://student-club-website-api12.vercel.app/post/createPost',
        {
          name:title,
          description:question,
          category,
          difficulty,
          email

        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data.data);

      
      if(response.data.status ==='success') {
        alert('Question Created Successfully');
        const newQuestion = response.data.data.newPost; // Assuming the API response structure matches the state structure

        // Dispatch the action to add the new question to the Redux state
        dispatch(addQuestion({ question: newQuestion }));
        navigate('/questions')
      }

      // Reset form fields,
      setTitle('');
      setQuestion('');
      setCategory('Strings');
      setDifficulty('Easy');

    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error(error);
      alert('Please fill all the fields')
    }
  };

  return (
    <div className='pt-20 h-full flex flex-col'>
    <div className='mx-auto font-bold md:text-6xl text-4xl'>Create Question</div>
    <div className='mx-auto py-32 flex flex-col'>
      <div className='flex flex-row gap-4 p-4'>
        <p className='text-3xl'>Title:-</p>
        <textarea
          className='bg-black text-lg'
          name=''
          id=''
          cols='100'
          rows='1'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>

      <div className='flex flex-row gap-4 p-4'>
        <p className='text-3xl'>Que:-</p>
        <textarea
          className='bg-black text-lg'
          name=''
          id=''
          cols='100'
          rows='10'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
      </div>

      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-4 p-4 ml-24'>
          <details className='dropdown mb-32'>
            <summary className='m-1 btn text-xl bg-black'>Category</summary>
            <select
              className='p-2 shadow menu dropdown-content z-[1] bg-base-100 flex flex-col gap-6'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='Strings'>Strings</option>
              <option value='Array'>Arrays</option>
              <option value='LinkedList'>LinkedList</option>
              <option value='Stacks'>Stacks</option>
              <option value='Queues'>Queues</option>
              <option value='Trees'>Trees</option>
              <option value='Others'>Others</option>
            </select>
          </details>

          <details className='dropdown mb-32'>
            <summary className='m-1 btn text-xl bg-black'>Difficulty</summary>
            <select
              className='p-2 shadow menu dropdown-content z-[1] bg-base-100 flex flex-col gap-6'
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value='Easy'>Easy</option>
              <option value='Medium'>Medium</option>
              <option value='Hard'>Hard</option>
            </select>
          </details>

          <div className='flex flex-col justify-center items-center'>
            <button
              className='btn bg-gray-300 text-black hover:text-white text-xl'
              onClick={handleQuestionSubmission}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

  



export default CreateQuestion;
