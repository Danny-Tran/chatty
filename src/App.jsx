import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      currentUser: 'anonymous', // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  onSubmit = evt => {
    if (evt.key == "Enter") {
      // evt.preventDefault();
      const newM = document.getElementById("chatbar-msg");
      const msg = newM.value;
     
      const oldMessages = this.state.messages;
      const username1 = this.state.currentUser
      const newMessage = {
        type:"postMessage",
        username: username1,
        content: msg,
      }
      const newMessages = [
        ...oldMessages,
        newMessage
      ];
    
      
    newM.value="";
    this.socket.send(JSON.stringify(newMessage))
    }
  }

  onChange = evt => {
    if (evt.key == 'Enter') {
      const nameInput = document.getElementById("chatbar-user")
      const newUserName = nameInput.value
      const notification = (this.state.currentUser + " changed the username to " + newUserName)
      const nChange = {
        type: "postNotification",
        content:notification
      }
      this.socket.send(JSON.stringify(nChange))
      this.setState({currentUser:newUserName})
    }
  }

  // clientCount = evt => {
  // const count = JSON.parse(evt)
  // this.setState({client:count})    
  // }

  componentDidMount() {
  //////CONNECTING TO WEBSOCKET////////
    this.socket = new WebSocket ("ws://localhost:3001")
    this.socket.onopen = () =>{
      // this.socket.send('FROM CLIENT SIDE')
      
      console.log("Connected to server")
    }

    ///// MESSGE COME FROM SERVER SIDE AND POSTING TO CLIENT SIDE /////
    this.socket.onmessage = (event) => {
      console.log(event.data);
      const obj = JSON.parse(event.data)
      
      if (obj.type === 'incomingMessage') {
        const newMessage = {
          id: obj.id, 
          username: obj.username, 
          content: obj.content
        }
        this.setState({messages: [...this.state.messages, newMessage]}) 
        return
      }
      

      if (obj.type === "counter") {
        this.setState({counter:obj.counter})
        return
      }
    }
  }

  
  

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="user">{this.state.counter} online</p>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser.name} onSubmit={this.onSubmit} onChange={this.onChange} />
    </div>
    );
  }
}
export default App;
