import React, { useState, useEffect, useRef } from "react";
import formController from "../../controllers/formController";
import styles from "./ChatAssistant.module.css";
import { FiSend } from "react-icons/fi";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface ChatAssistantProps {
  externalMessage?: string | null;
  isTyping?: boolean;
}
const formatMessage = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a key={index} href={part} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {part}
      </a>
    ) : (
      part
    )
  );
};

const ChatAssistant: React.FC<ChatAssistantProps> = ({ externalMessage, isTyping }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await formController.sendUserQuestion(input, setLoading);
      if (response?.message?.length) {
        const botResponse: Message = { text: response.message[0], sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { text: "Erro ao obter resposta.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (externalMessage) {
      setMessages((prevMessages) => [...prevMessages, { text: externalMessage, sender: "bot" }]);
    }
  }, [externalMessage]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className={styles.chatContainer}>
      <h3>Assistente</h3>
      <div className={styles.chatBox} ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
            {formatMessage(msg.text)}
          </div>
        ))}
        {(loading || isTyping) && (
          <div className={styles.typingIndicator}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        )}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua pergunta..."
          className={styles.input}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          {FiSend({ className: styles.sendIcon })}
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
