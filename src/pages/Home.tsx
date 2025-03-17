import React, { useState } from "react";
import Header from "../components/Header/Header";
import AddForm from "../components/AddForm/AddForm";
import ChatAssistant from "../components/ChatAssistant/ChatAssistant";
import "../styles/global.css";

const Home: React.FC = () => {
  const [chatMessage, setChatMessage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const sendMessageToChat = (message: string) => {
    setChatMessage(message);
    setIsTyping(false);
  };

  const setTypingStatus = (status: boolean) => {
    setIsTyping(status);
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <AddForm sendMessageToChat={sendMessageToChat} setTypingStatus={setTypingStatus} />
        <ChatAssistant externalMessage={chatMessage} isTyping={isTyping} />
      </div>
    </div>
  );
};

export default Home;
