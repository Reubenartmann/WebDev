import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase.js'


var date = new Date();
var timestamp = date.getTime();

class GameBoard extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      chat: '',
      sent: '',
      chats: [],
      friends: [],
      user: null
    }
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);

       this.login = this.login.bind(this);
       this.logout = this.logout.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

logout() {
  auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
}

login() {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
}

  handleSubmit(e) {
  e.preventDefault();
  // usersRef is our host, user is our data
  const chatRef = firebase.database().ref('chats');
  const chats = {
    from: this.state.user.displayName || this.state.user.email,
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

removeItem(itemId) {
  const chatsRef = firebase.database().ref(`/chats/${itemId}`);
  chatsRef.remove();
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
  const usersRef = firebase.database().ref('friends');
  usersRef.on('value', (snapshot) => {
    let friends = snapshot.val();
    let newState = [];
    for (let friend in friends) {
      newState.push({
        id: friend,
        name: friends[friend].name,
        phone: friends[friend].phone,
        color: friends[friend].color,
        icon: friends[friend].icon
      });
    }
    this.setState({
      friends: newState
    });
  });
}

  render() {
    return (
      <div className='RenderAll'>
        <header>
            <div>
              <h3>Chat</h3>
              {this.state.user ?
                <button onClick={this.logout}>Log Out</button>
                :
                <button onClick={this.login}>Log In</button>
              }
            </div>
        </header>

        <table id="gameBoard">
        </table>

        <div className='ChatBox'>
          <section className='add-chat'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="chat" className='chatInput' placeholder="Message" onChange={this.handleChange} value={this.state.chat}/>
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

export default GameBoard;
