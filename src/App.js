import './App.css'; 
//import RegisterForm from './Components/RegisterForm';
import Navbar from './Components/Navbar';
import React, { useContext, useEffect } from 'react'
import "./CSS/mycontainer.css"
import Research from './Components/Research';
//import BookCard from './Components/BookCard';
import axios from 'axios';
import backendUrl from './Data/EnvData/EnvVariablesProvider';
import CardsDisplay from './Components/CardsDisplay';
import BackendTest1 from './Test/BackendTest1';
import FormulaireTest from './Test/FormulaireTest';
import { GlobalContextVar } from './Data/Context/GlobalContext';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import WriteMessage from './Components/MessageComponents/WriteMessage';
import MessageBox from './Components/MessageComponents/MessageBox';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Components/Profile';
import TriContextProvider from './Data/Context/TriContext';
import AddBook from './Components/AddBook';
import SendNotification from './Components/NotificationComponents.js/SendNotification';
import GetNotification from './Components/NotificationComponents.js/GetNotification';
import GetNotificationAdmin from './Components/NotificationComponents.js/GetNotificationAdmin';

 
 

function App() {
  

  const { isLog,isLogAdmin,setIsLogAdminFunction, userName,data, books,SetbookFunction, SetUserNameFunction, setIsLogFunction  } = useContext( GlobalContextVar );
  
  const checkLog = async () => {
    try {
      const response = await axios.get(backendUrl+"/CheckLog", {
        withCredentials: true // Ajoutez cette ligne
      });
  
      // Assurez-vous que la réponse contient un boolean
      if (typeof response.data === 'boolean') {
        setIsLogFunction(response.data);
        console.log("IS LOG RESPONSE back :" + response.data);
         
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error checking log:', err);
    }
  };
  
  useEffect(() => {
    //console.log("Mon backend url"+backendUrl)
    axios.get(backendUrl + "/GetAllBooks" , { withCredentials:true } )
      .then((response) => {
        const json = JSON.stringify(response.data);
       // const jsondata = JSON.stringify(response.data);
        SetbookFunction(response.data);
      });
      checkLog();
      console.log("FROM CONTEXT : "+ isLog )
  }, []);

  
  useEffect(()=>{
    console.log("FROM CONTEXT : "+ isLog )
  }, [isLog] )
  useEffect(() => {
    console.log("books mis à jour :", books);
  }, [books]);

/*
  

 */
  return ( 
       <div  >
      


    
      <div  >
        
       <div   >
          <Router>
          <Navbar/>
      <div style={{ display:"flex" , flexDirection:"column",  justifyContent:"center" ,
          
         }} className="container"  >
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Register" element={<RegisterForm />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/MessageBox" element={<MessageBox />} />
          <Route path="/AddBook" element={<AddBook />} />
          <Route path="/SendNotification" element={<SendNotification />} />
          <Route path="/GetNotification" element={<GetNotification />} />
          <Route path="/GetNotificationAdmin" element={<GetNotificationAdmin />} />

          
          
        </Routes>
      </div>
    </Router>
       </div>
                
 
    </div>
    
    </div>
      );
}

export default App;
