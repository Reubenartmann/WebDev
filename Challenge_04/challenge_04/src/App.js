import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './components/gameBoard';
import ChatRoom from './components/chatRoom.js';
import Friends from './components/addUsers.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import posed from 'react-pose';

const MainMenu = () => {
  return (
    <div className='navigation'>
    <Link to="/addUsers">
      <Button variant="contained" color="primary">Add Player</Button>
    </Link>
      <Link to="/chatRoom">
      <Button variant="contained" color="primary">Chat Room</Button>
      </Link>
      <Link to="/gameBoard">
        <Button variant="contained" color="primary">Live Game</Button>
      </Link>
    </div>
  );
};

    class App extends Component {
      render() {
        return (
          <Router>
            <div className="myClass">
              <header className="myHeader">
                <MainMenu />
              </header>
              <div>
              <Route exact path="/addUsers" component={Friends} />
              <Route exact path="/gameBoard" component={GameBoard} />
              <Route exact path="/chatRoom" component={ChatRoom} />
              </div>
            </div>
          </Router>
        );
      }
    }


export default App;
