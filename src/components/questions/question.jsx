 /* eslint-disable */ 
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {BiSolidAddToQueue} from 'react-icons/bi'
import {  useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
import { setQuestion } from '../../redux/slices/postSlice';


const Question = () => {
    const dispatch = useDispatch();
    const [UserRole,setUserRole] = useState(false);
    const role = useSelector((state) => state.User.user?.roles);
    const questions = useSelector((state)=> state.Post.questions);

    useEffect(() => {
        if(role==='admin'||role==='member'){
            setUserRole(true);
        }
        else if(role==='user'){
            setUserRole(false);
        }
      },[role])

    
    
    useEffect(() => {
            const getAllquestions = async () => {
                const res = await axios({
                  method: 'GET',
                  url:  'https://student-club-website-api12.vercel.app/app/post/getAllPost',
                  withCredentials: true,
                });
              // console.log(res.data.data.posts[0].difficulty);
                if(res.data.status === 'success')
                {
                    // console.log(res.data.data.posts);
                    const questions = res.data.data.posts;
                    dispatch(setQuestion({questions: questions}));
                }
                else{
                    console.log('something went wrong while getting questions')
                }
            }
           getAllquestions();
    },[])
    
   
    
return(
    
    <div className='pt-20 h-full '>
       {UserRole &&(<div className='flex justify-end mr-5 mb-2 rounded-xl'>
           <Link to={'/createQuestion/:id'} className='btn bg-white text-black hover:text-white' >
              Create Question
              <BiSolidAddToQueue/>
           </Link> 
        </div>
        )}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {questions?.map((question) => (
                <div key={question._id} className="bg-black p-4 rounded-2xl">
                    <div className=" rounded-lg overflow-hidden">
                        <div>
                        <div className="p-2 flex flex-row justify-between bg-gray-800 text-white">
                            <div className="text-base md:text-sm font-semibold">{question.difficulty}</div>
                            <div className="text-base md:text-sm font-semibold">{question.category}</div>
                        </div>

                        <div className='p-2'>
                            <p className='text-lg font-bold'>{question.name}</p>
                        </div>

                        <div className="p-2 text-white">
                            {question.description.slice(0, 100)}
                        </div>
                        </div>

                        <div className="p-2 flex justify-center space-x-28 md:space-x-60 mt-2 text-sm md:text-base">
                        <div className="flex items-end">
                            <Link to={`/questionOne/${question._id}`} className="btn btn-primary">
                            View
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

}

export default Question;



