# In-Built Event -
## Description
This event is triggered when the bot is ready to start processing messages. It can be used to perform any setup tasks or to log that the bot is ready.

there are two types of evvent in in-buit event:
**Connnection** 
```
io.on("connection", (socket) => {
  console.log("A user Connected");
});
```

**Disconnect**
```
io.on("connection", (socket) => {

  socket.on("disconnect", ()=>{
    console.log("A user disconnect");  
  })

});
```


# Custom Event -
## Description
This event is triggered when a custom event occurs. It can be used to handle specific actions or to respond to user interactions that are not covered by the default events.

```
socket.on("kiwi", (data)=>{
    console.log(data);
    // console.log("Message Received");
})
```

# AI Service -
## Description
This service handles interactions with the AI model. It can be used to generate responses based on user input or to perform other AI-related tasks.

```javascript
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  
  return response.text;
}

module.exports = generateResponse
```
it import and used in server.js file

```javascript
const generateResponse = require('./src/services/ai.service')
```