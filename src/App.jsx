import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

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
      const newMessage = {
        id: obj.id, 
        username: obj.username, 
        content: obj.content
      }
      
      this.setState({messages: [...this.state.messages, newMessage]})
    }
  }

  /////////// FUNCTION THAT TAKE CARE OF ENTER ////////////
  onSubmit = evt => {
    evt.preventDefault();
    const newM = evt.target.elements.textbox;
    const user = evt.target.elements.user;
    const oldMessages = this.state.messages;
    const newMessage = {
      
      username: user.value,
      content: newM.value,
    }
    const newMessages = [
      ...oldMessages,
      newMessage
    ];
    
    this.socket.send(JSON.stringify(newMessage))
    newM.value="";
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser.name} newMessage={this.onSubmit} />
    </div>
    );
  }
}
export default App;
