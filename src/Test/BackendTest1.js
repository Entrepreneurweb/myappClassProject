
import React, { useEffect, useContext } from 'react'
import backendUrl from '../Data/EnvData/EnvVariablesProvider';
import axios from 'axios';
import { GlobalContextVar } from '../Data/Context/GlobalContext';
 

export default function BackendTest1() {

  const { data, books, SetbookFunction } = useContext( GlobalContextVar );
   
  
  useEffect(() => {
    axios.get(backendUrl + "/GetAllBooks")
      .then((response) => {
        SetbookFunction(response.data);
      });
  }, []);
  
  useEffect(() => {
    console.log("books mis à jour :", books);
  }, [books]);
  

  return (
    <>
    </>
  )
}
