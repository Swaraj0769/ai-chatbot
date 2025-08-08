import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import './App.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')

  const handleSendMessage=()=>{
    if(inputText.trim() === '') return

    const newMessage = {
      id: Date.now(),
      text: inputText,
      timestamp: new Date().toLocaleTimeString(),
      sender: 'user'
    }
    
    setMessages(prevMessages => [...prevMessages, userMessage])
    socket.emit('ai-message', inputText)
    setInputText('')

    // setTimeout(() => {
    //   const botMessage = {
    //     id:Date.now()+1,
    //     text: generateBotResponse(),
    //     timestamp: new Date().toLocaleTimeString(),
    //   sender: 'bot'
    //   }
    //   setMessages(prevMessages => [...prevMessages, botMessage])
    // }, 1000)

  }



  const handleInputChange =(e)=>{
    setInputText(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {  
      handleSendMessage()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setinputText([...inputText, { text: message, sender: 'user' }])
      
      socket.emit('ai-message', message)

      setMessage('')
    }
  }

  useEffect(() => {
    let socketInstance = io("http://localhost:3000");
    setSocket(socketInstance)

    socketInstance.on("ai-message-response", (response) => {
      
    })
  }, [])

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chatty ai</h1>
      </div>
      
      <div className="chat-messages">
        {messages.length === 0?(
          <div className='no-messages'>
            <p>Start a conversation...</p>
          </div>
        ):(
          messages.map((message) => (
            <div className='message'>
              <div key={message.id} className='message-content'>
                  <span className='message-text'>{message.text}</span>
                  <span className='message-timestamp'>{message.timestamp}</span>
              </div>
            </div>
          ))
        )}
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
