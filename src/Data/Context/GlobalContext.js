import { createContext, useState } from "react";
import React from 'react'
import axios from "axios";
import backendUrl from "../EnvData/EnvVariablesProvider";
import { useEffect } from "react";

export const GlobalContextVar = createContext();



export default function GlobalContext({children}) {
    const[data, setdata]=useState();
    const[books, setbooks]=useState([{ }]);
    const[isLog, setIsLog]=useState(false);
    const[isLogAdmin, setIsLogAdmin]=useState(false);
    const[userName, setUserName]=useState(undefined);


const SetbookFunction =(val)=>{
setbooks(val);
}

const SetUserNameFunction=(newname)=>{
      setUserName(newname);
}
const setIsLogFunctionTrue=()=>{
    setIsLog(true)
}
const setIsLogFunctionFalse=()=>{
  setIsLog(false)
}
const setIsLogAdminFunction=(val)=>{
  setIsLogAdmin(val)
}
const setIsLogAdminFunctionFalse=()=>{
setIsLogAdmin(false)
}
const setIsLogFunction=(value)=>{
  setIsLog(value)
  }

  const checkLogContext = async () => {
    try {
      const response = await axios.post(backendUrl+"/CheckLog");
  
      // Assurez-vous que la réponse contient un boolean
      if (typeof response.data === 'boolean') {
        //setIsLogFunction(response.data);
        console.log("IS LOG RESPONSE :"+response.data)
        console.log(isLog)
        return  response.data
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error checking log:', err);
      
    }
  };
  const checkIsLogAdmin = async () => {
    try {
        const response = await axios.get(backendUrl + "/IslogAdminTest", { withCredentials: true });
        setIsLogAdmin(response.data);
    } catch (err) {
        console.error("Error checking admin log:", err);
    }
};

useEffect(() => {
    checkIsLogAdmin();
}, []);


  return (
    <GlobalContextVar.Provider value={{ isLog,isLogAdmin,userName,data, books,SetbookFunction, SetUserNameFunction,
      setIsLogFunctionTrue, setIsLogFunctionFalse , setIsLogAdminFunction , setIsLogAdminFunctionFalse, setIsLogFunction
     }} >
        
        {children}
        
    </GlobalContextVar.Provider>
  )
}
