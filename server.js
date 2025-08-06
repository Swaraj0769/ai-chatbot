// const { log } = require('console');
require('dotenv').config();
const app = require('./src/app')
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/services/ai.service')

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log("A user Connected");

  socket.on("disconnect", ()=>{
    console.log("A user disconnect");
  })
  
  socket.on('ai-message',async(data)=>{
    console.log("Ai message received:", data);

    const gen = await generateResponse(data.prompt)

    console.log("",gen);
    
  })
});


httpServer.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})