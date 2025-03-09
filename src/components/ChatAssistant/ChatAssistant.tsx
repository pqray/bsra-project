import React, { useState } from "react";
import styles from "./ChatAssistant.module.css";
import { FiSend } from "react-icons/fi";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { text: input, sender: "user" as const }];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages([
        ...newMessages,
        { text: "Como posso ajudar?", sender: "bot" as const },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className={styles.chatContainer}>
      <h3>Assistente</h3>
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? styles.userMessage : styles.botMessage}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
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
