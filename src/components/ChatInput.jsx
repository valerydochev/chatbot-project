import { useState } from "react";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(e) {
    setInputText(e.target.value);
  }

  async function sendMessage() {
    if (isLoading) return;

    const trimmed = inputText.trim();
    if (!trimmed) return;

    setIsLoading(true);

    // Добавяме съобщението на потребителя и временно "Typing..."
    setChatMessages((prev) => [
      ...prev,
      {
        message: trimmed,
        sender: "user",
        id: crypto.randomUUID(),
      },
      {
        message: "Typing...",
        sender: "robot",
        id: "typing",
      },
    ]);

    setInputText("");

    try {
      // Изпращаме заявката към бекенда
      const response = await fetch("http://localhost:8787/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history: chatMessages,
        }),
      });

      const data = await response.json();
      const reply = data?.reply ?? "Sorry — no response.";

      // Заместваме "Typing..." с реалния отговор от AI
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === "typing"
            ? {
                message: reply,
                sender: "robot",
                id: crypto.randomUUID(),
              }
            : msg
        )
      );
    } catch (err) {
      console.error("Error sending message:", err);

      // При грешка — показваме съобщение
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === "typing"
            ? {
                message: "Server error — cannot reach AI.",
                sender: "robot",
                id: crypto.randomUUID(),
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        className="chat-input"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        disabled={isLoading}
      />

      <button
        onClick={sendMessage}
        className="send-button"
        disabled={isLoading || !inputText.trim()}
      >
        {isLoading ? "Typing..." : "Send"}
      </button>
    </div>
  );
}
