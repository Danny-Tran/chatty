import React, {Component} from 'react';

function ChatBar (props){
    return (
        
        <form onSubmit={props.newMessage}>
        <footer className="chatbar">
        <input name="user" className="chatbar-username" placeholder="name" defaultValue={props.username} />
        <input name="textbox" className="chatbar-message" placeholder="Type a message and hit ENTER" />
        <button id="button" type="submit">test</button>
        </footer>
        </form>
        );
}


export default ChatBar;