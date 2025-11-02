import { useRef, useEffect } from 'react'
import { ChatMessage } from '../components/ChatMessage';
import './ChatMessages.css';

    function ChatMessages({ chatMessages }) {
        const endRef = useRef(null);

        useEffect(() => {
          if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, [chatMessages]);

        if (chatMessages.length === 0) {
          return (
            <div className="chat-messages-container">
              <div className="chat-placeholder">
                💬 Welcome to the chatbot project! Send a message using the
                textbox above.
              </div>
            </div>
          );
        }

        return (
          <div className="chat-messages-container">
            {chatMessages.map((m) => (
              <ChatMessage key={m.id} message={m.message} sender={m.sender} />
            ))}
            <div ref={endRef} />
          </div>
        );
      }
        
      export default ChatMessages;


