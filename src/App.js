/* eslint-disable */ 
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import Profile from "./components/profile/profile";
import Login from "./components/auth/login"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./components/auth/signup";
import Question from "./components/questions/question";
import QuestionOne from "./components/questions/questionOne"
import CreateQuestion from "./components/questions/createQuestion";
import Answer from "./components/answer/createAnswer";
import AnswersList from "./components/answer/getAnswersList";
import OtherProfile from "./components/profile/otherProfile"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/questions" element={<Question/>}/>
          <Route path="/questionOne/:id" element={<QuestionOne/>}/>
          <Route path="/createQuestion/:id" element={<CreateQuestion/>}/>
          <Route path="/createAnswer/:id" element={<Answer/>}/>
          <Route path="/getAnswers/:id" element={<AnswersList/>}/>
          <Route path="/getOtherProfile/:id" element={<OtherProfile/>}/>
          
        </Routes>
        <Footer />
     </BrowserRouter>
    </div>
  );
}

export default App;
