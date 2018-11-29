import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from '../firebase.js'
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
  const accountRef = firebase.database().ref('friends');
  accountRef.on('value', (snapshot) => {
    let accountshot = snapshot.val();
    let newState1 = [];
    for (let accunt in accountshot) {
      newState1.push({
        id: accunt,
        name: accountshot[accunt].name,
      });
    }
    this.setState({
      accounts: newState1
    });
  });

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
      chat room
      <div className='chat-container'>
        <section className='add-chat'>
            <form onSubmit={this.handleSubmit}>


              <FormControl>
              <InputLabel htmlFor="component-simple">Name</InputLabel>
              <Input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
              </FormControl>
              <FormControl>
              <InputLabel htmlFor="component-simple">Message</InputLabel>
              <Input type="text" name="chat" placeholder="What's your message?" onChange={this.handleChange} value={this.state.chat} />
              </FormControl>
              <Button id="addFriend" onClick={this.handleSubmit}>Send</Button>

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
