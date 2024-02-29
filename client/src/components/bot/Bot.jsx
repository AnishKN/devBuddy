import React from 'react'

function Bot() {
    const handleClick  = () => {
        let popUp = document.getElementById("bot-popUp")
        if(popUp.style.display == "none"){
            popUp.style.display = "block";
        }
        else{
            popUp.style.display = "none";
        }
    }

  return (
    <div>
      {/* Bot pop up trigger */}
      <img 
      src="logo.png" 
      height={50} 
      width={50}
      style={{position:"absolute",right:30,bottom:30,zIndex:100,background:"transperent"}}
      onClick={handleClick}
      />

      {/* bot chat body */}
      <div id="bot-popUp" style={{display:"none"}}>
        
      </div>

    </div>
  )
}

export default Bot
