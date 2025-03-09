import React from "react";
import Header from "../components/Header/Header";
import FormAtivos from "../components/AddForm/AddForm";
import ChatAssistente from "../components/ChatAssistant/ChatAssistant";
import "../styles/global.css";

const Home: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <FormAtivos />
        <ChatAssistente />
      </div>
    </div>
  );
};

export default Home;
