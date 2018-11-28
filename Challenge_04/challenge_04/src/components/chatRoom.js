import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from '../firebase.js'

var date = new Date();
var timestamp = date.getTime();


class ChatRoom extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      chat: '',
      sent: '',
      chats: []
    }
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
  e.preventDefault();
  // usersRef is our host, user is our data
  const chatRef = firebase.database().ref('chats');
  const chats = {
    from: this.state.username,
    message: this.state.chat,
    sent: timestamp
  }
  // push to firebase
  chatRef.push(chats);
  // set text fields to ''
  this.setState({
    username: '',
    chat: ''
  });
}

componentDidMount() {
  const chatsRef = firebase.database().ref('chats');
  chatsRef.on('value', (snapshot) => {
    let chats = snapshot.val();
    let newState = [];
    for (let chat in chats) {
      newState.push({
        id: chat,
        from: chats[chat].from,
        message: chats[chat].message,
        sent: chats[chat].sent
      });
    }
    this.setState({
      chats: newState
    });
  });
}

render() {
  return (
    <div className='app'>
      <header>
          <div className='wrapper'>
            <h1>Chat</h1>
          </div>
      </header>

      <div className='chat-container'>
        <section className='add-chat'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder="Name" onChange={this.handleChange} value={this.state.username}/>
              <input type="text" name="chat" placeholder="Message" onChange={this.handleChange} value={this.state.chat}/>
              <button>Send</button>
            </form>
        </section>

        <section className='display-chat'>
          <div className="wrapper">
            <ul>
              {this.state.chats.map((chat) => {
                return (
                  <li key={chat.id}>
                    <p className="name">{chat.from}</p>
                    <p>{chat.message}</p>
                    <p className="sent">sent: {(new Date(chat.sent)).toLocaleString()}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
}


export default ChatRoom;