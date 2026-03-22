"use client";

import React, { useState, useRef } from "react";
import { personalData } from "../../data/personalData";
import useGemini from "../../hooks/useGemini";
import { SUGGESTED_QUESTIONS } from "@/constants";
import type { Message } from "./Chatbot.types";
import useChatScroll from "@/hooks/useChatScroll";
import styles from "./Chatbot.module.css";

const Chatbot: React.FC = () => {
  const [input, setInput] = useState("");
  const { messages, loading, error, sendMessage, clearMessages } = useGemini();
  const bottomRef = useRef<HTMLDivElement>(null);

  useChatScroll<Array<Message>>(messages, loading);

  const handleSend = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    const text = input;
    setInput("");
    await sendMessage(text);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <span className={styles.avatar}>🤖</span>
          <div>
            <h2 className={styles.title}>
              Ask about {personalData.name.split(" ")[0]} or anything else 😊
            </h2>
            <p className={styles.subtitle}>Powered by Gemini 2.5 Flash</p>
          </div>
        </div>
        <button
          className={styles.clearButton}
          onClick={clearMessages}
          title="Clear chat"
          type="button"
        >
          ✕ Clear
        </button>
      </div>

      <div className={styles.messages}>
        {messages.length === 0 && (
          <div className={styles.welcome}>
            <p>
              👋 Hi! Ask me anything about <strong>{personalData.name}</strong>.
            </p>
            <div className={styles.suggestions}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  className={styles.suggestion}
                  onClick={() => sendMessage(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === "user" ? styles.userMessage : styles.botMessage
            }`}
          >
            <span className={styles.senderLabel}>
              {msg.sender === "user" ? "You" : "Assistant"}
            </span>
            <p className={styles.messageText}>{msg.text}</p>
          </div>
        ))}

        {loading && (
          <div className={`${styles.message} ${styles.botMessage}`}>
            <span className={styles.senderLabel}>Assistant</span>
            <p className={styles.typing}>
              <span />
              <span />
              <span />
            </p>
          </div>
        )}

        {error && <div className={styles.error}>⚠️ {error}</div>}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className={styles.inputContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder={`Ask about ${personalData.name}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          disabled={loading}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
