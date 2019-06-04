import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loading:true}
  }
  render() {
    return (
      <ChatBar />
    );
  }
}
export default App;
