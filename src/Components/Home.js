import React from 'react'
 import "../CSS/mycontainer.css"
import Research from './Research'
import CardsDisplay from './CardsDisplay'

export default function Home() {
  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center" ,  width:"100%",}} className="container" >
        
      <Research/>                        
                   
       <CardsDisplay />  
    </div>
  )
}
