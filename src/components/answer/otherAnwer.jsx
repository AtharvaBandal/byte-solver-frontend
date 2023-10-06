 /* eslint-disable */ 
 import React,{useState,useEffect} from 'react'
 import { useSelector } from 'react-redux';
 import { Link } from 'react-router-dom';
 import axios from 'axios';
 
 const MyAnswers = ({ userId }) => {
   const [answers, setAnswers] = useState([]);
   const [questions, setQuestions] = useState([]);
   const allQuestions = useSelector((state) => state.Post.questions);
 
   useEffect(() => {
     const handleMyAnswers = async () => {
       const res = await axios({
         method: 'GET',
        //  url: `https://byte-solver-backend.onrender.com/answer/getAnswer_user/${user._id}`,
          url:`http://localhost:3000/answer/getAnswer_user/${userId}`,
         withCredentials: true,
       });
 
       if (res.data.status === 'success') {
         const userAnswers = res.data.data.answers;
        
    
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
   }, [userId, allQuestions]);
   
  
 
   return (
    
 <div className='pt-20'>
   <div className='flex flex-col justify-center items-center'>
     {questions
       .filter((question) => question)
       .map((question) => (
         <div
           key={question._id}
           className="m-[60px] p-6 md:m-[10px] bg-black text-white rounded-xl mt-5 mx-5  w-full"
         >
           <div className="m-2 md:m-4">
             <div className="flex flex-row justify-between">
               <div className="text-base md:text-sm font-semibold">{question.difficulty}</div>
               <div className="text-base md:text-sm font-semibold">{question.category}</div>
             </div>
 
             {question.name && (
               <div className='my-2'>
                 <p className='text-lg font-bold'>{question.name}</p>
               </div>
             )}
 
             <div className="my-2 md:my-5">
               <p className=""> 
                 {question.description.slice(0, 100) || 'Description not available'}
               </p>
             </div>
 
             <div className="flex flex-row justify-center space-x-28 md:space-x-60 mt-5 text-sm md:text-base">
               <div className="flex items-end">
                 <Link to={`/questionOne/${question._id}`} className="btn btn-primary">View</Link>
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