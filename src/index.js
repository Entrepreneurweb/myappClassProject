import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import GlobalContext from './Data/Context/GlobalContext';
import TriContextProvider from './Data/Context/TriContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <GlobalContext>
    <TriContextProvider>
    <App />
    </TriContextProvider>
    
    
 
 </GlobalContext>
   
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
