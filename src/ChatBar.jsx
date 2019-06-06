import React, {Component} from 'react';

function ChatBar (props){
    return (
        
        
        <footer className="chatbar">
        <input name="user" className="chatbar-username" id="chatbar-user" placeholder="name" defaultValue={props.username} />
        <input onKeyPress={props.onSubmit} name="textbox" className="chatbar-message" id="chatbar-msg" placeholder="Type a message and hit ENTER" />
        
        </footer>
        
        );
}


export default ChatBar;