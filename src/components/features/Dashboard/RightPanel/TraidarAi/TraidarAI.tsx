import { useState } from "react";
import send from "../../../../../assets/SVG/Send.svg";
import styles from "./TraidarAI.module.css";

const TraidarAI = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      console.log("Sending message:", inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.conversation}>{/* Messages will go here */}</div>
      <div className={styles.promptContainer}>
        <div className={styles.promptBox}>
          <input
            type="text"
            placeholder="How can I assist your trading today?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.sendButton}>
          <button type="button" onClick={handleSendMessage}>
            <img src={send} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraidarAI;
