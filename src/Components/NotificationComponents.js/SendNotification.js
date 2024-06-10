import React, { useState } from 'react'
import "./SendNotification.css"
import backendUrl from '../../Data/EnvData/EnvVariablesProvider';
import axios from 'axios';

export default function SendNotification() {
    const[ notificationTitle, setNotificationTitle ]=useState("");
    const[ notificationText, setNotificationTest ]=useState("");


    const HandleSubmitAnounce = async ()=>{
        try{
            await  axios.post(backendUrl+"/SendNotification" ,{
                Title:notificationTitle,
                Content: notificationText
            } ,  { withCredentials: true } ).then( (reponse)=>{
                console.log(reponse.data);
            })
        }catch( error ){
            
            console.log(error);
        }

    }

  return (
    <div  style={{ marginBottom:"50px" }}  className="messageBox">
    <div className="fileUploadWrapper">
      <label htmlFor="file">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
          <circle
            strokeWidth="20"
            stroke="#6c6c6c"
            fill="none"
            r="158.5"
            cy="168.5"
            cx="168.5"
          ></circle>
          <path
            strokeLinecap="round"
            strokeWidth="25"
            stroke="#6c6c6c"
            d="M167.759 79V259"
          ></path>
          <path
            strokeLinecap="round"
            strokeWidth="25"
            stroke="#6c6c6c"
            d="M79 167.138H259"
          ></path>
        </svg>
        <span className="tooltip">Add an image</span>
      </label>
      <input type="file" id="file" name="file" />
    </div>
    <input required placeholder="Title..." value={notificationTitle} onChange={(e)=>{
        setNotificationTitle(e.target.value);
    }}  type="text" id="messageInput" />
    <input required placeholder="New Anouncement..." value={notificationText} onChange={(e)=>{
        setNotificationTest(e.target.value);
    }}  type="text" id="messageInput" />
    <button  onClick={HandleSubmitAnounce}   id="sendButton">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
        <path
          fill="none"
          d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
        ></path>
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="33.67"
          stroke="#6c6c6c"
          d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
        ></path>
      </svg>
    </button>
  </div>
  )
}
