import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import './App.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [conversations, setConversations] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setConversations([...conversations, { text: message, sender: 'user' }])
      setMessage('')
    }
  }

  useEffect(() => {
    let socketInstance = io("http://localhost:3000");
    setSocket(socketInstance)
  }, [])

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chatty ai</h1>
      </div>
      
      <div className="chat-messages">
        {conversations.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              <div className="message-sender">{msg.sender === 'user' ? 'You' : 'ChatBot'}</div>
              {msg.text}
              <div className="message-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        ))}
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  )
}

export default App
