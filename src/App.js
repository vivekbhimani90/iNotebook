import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "../src/Context/Notes/NoteState";
import AlertState from "../src/Context/Alert/AlertState"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
         
      
      <AlertState>
      <NoteState>
     
        <BrowserRouter>
          <Navbar />
          <Alert />
          
          
          <div className="container my-3">
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </BrowserRouter>
       
      </NoteState>
      </AlertState>
  
    </>
  );
}

export default App;
