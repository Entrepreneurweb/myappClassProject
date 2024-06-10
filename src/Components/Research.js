import React, { useContext, useState } from 'react'
import "../CSS/Research.css"
import { TriContext } from '../Data/Context/TriContext';
export default function Research() {
  const[ Text, setText]=useState("");
  const { TriPrice, TriGenre,SearchText, SetTriGenreFunction , SetTriPriceFunction, setSearchTextFunction}=useContext(TriContext);

  const HandleSearch=(val)=>{
    setSearchTextFunction(val);
    //alert(SearchText)
  }

  
 

  return (
     <>
        <div style={{ display:"flex" , flexDirection:"column" , width:"70%",  justifySelf:"center" }}  >
        <div style={{ height:"300px", marginTop:"100px" ,   display:"flex",
         flexDirection:"column" , justifyContent:"center", alignItems:"center" }} >
        <div className="search">
        <input value={Text}  onChange={(e)=>{  
           setText(e.target.value);
        }}  placeholder="Search..." type="text" />
        <button onClick={ ()=>{
          HandleSearch(Text)
        }} type="submit">Go</button>
      </div>
        </div>
        </div>

     </>
  )
}
