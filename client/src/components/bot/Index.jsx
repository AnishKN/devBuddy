import React, { useState, useEffect } from "react";
import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import Messages from "./components/Messages";
import Input from "./components/Input";
import API from "./ChatbotAPI";
import Header from "./components/Header";
import './style.css'

export default function Index() {
  const [messages, setMessages] = useState([]);

    const handleClick  = () => {
        let popUp = document.getElementById("bot-popUp")
        if(popUp.style.display == "none"){
            popUp.style.display = "flex";
        }
        else{
            popUp.style.display = "none";
        }
    }

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await API.GetChatbotResponse("hi")}
        />
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async text => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await API.GetChatbotResponse(text)}
      />
    );
    setMessages(newMessages);
  };

  return (
    <>
        {/* Bot pop up trigger */}
        <img 
        src="logo.png" 
        height={50} 
        width={50}
        style={{position:"absolute",right:30,bottom:30,zIndex:100,background:"transperent"}}
        onClick={handleClick}
        />
        <div 
        className="chatbot" 
        id="bot-popUp"
        >
        <Header />
        <Messages messages={messages} />
        <Input onSend={send} />
        </div>
    </>
  );
}

