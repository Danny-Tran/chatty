import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id:1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id:2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        },
        {
          id:3,
          type: "incomingMessage",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        {
          id:4,
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom",
        },
        {
          id:5,
          type: "incomingMessage",
          content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        {
          id:6,
          type: "incomingMessage",
          content: "...",
          username: "nomnom"
        },
        {
          id:7,
          type: "incomingMessage",
          content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
        },
        {
          id:8,
          type: "incomingMessage",
          content: "This isn't funny. You're not funny",
          username: "nomnom"
        },
        {
          id:9,
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny",
        }
      ]}
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 10, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

    /////////// FUNCTION THAT TAKE CARE OF ENTER ////////////
  onSubmit = evt => {
    evt.preventDefault();
    const newM = evt.target.elements.textbox;
    const user = evt.target.elements.user;
    const oldMessages = this.state.messages;
    const newMessages = [
      ...oldMessages,
      {
        username: user.value,
        content: newM.value,
      }
    ];
    this.setState({messages: newMessages});
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
