const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

const PORT = 3001;

// Create a new express server
const server = express()

// Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'))
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
 // update user online when connect
  wss.clients.forEach(client =>{
    client.send(JSON.stringify({type:"counter" , counter: wss.clients.size}))
  })

  // message sending to client 
  ws.on('message', (message) => {
    const content = JSON.parse(message);
    content.color = "black"
    content.id=uuidv4();
    content.type = content.type.replace("post" , "incoming")
  
    // loop for every client that connect
    console.log(content);
      wss.clients.forEach(client => {
        client.send(JSON.stringify(content))
      });
  })

  /// call back on disconnect, update user online when disconnect ///
  ws.on('close', () => {
    wss.clients.forEach(client =>{
      client.send(JSON.stringify({type:"counter" , counter: wss.clients.size}))
    });
    console.log('Client disconnected')
  })
});

