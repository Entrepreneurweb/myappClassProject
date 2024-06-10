import { createContext, useContext, useState } from "react";
import React from 'react'


export const TriContext = createContext();



export default function TriContextProvider({children}) {
        const[TriPrice, SetTriPrice]=useState(0)
        const[TriGenre, SetTriGenre]=useState("");
        const[ SearchText, setSearchText]=useState("");
//
        const SetTriPriceFunction=(newPrice)=>{
            SetTriPrice(newPrice)
        }

        //
        const SetTriGenreFunction=(newGenre)=>{
            SetTriGenre(newGenre)
        }
        const setSearchTextFunction=(newText)=>{
          setSearchText(newText)
      }
  return (
    <TriContext.Provider  value={{ TriPrice, TriGenre, SearchText   , SetTriGenreFunction , SetTriPriceFunction, setSearchTextFunction}} >
      {children}
      </TriContext.Provider>
  )
}
