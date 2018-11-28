import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './components/gameBoard';
import ChatRoom from './components/chatRoom.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className='navigation'>
      <Link to="/chatRoom">
        <button>Chat Room</button>
      </Link>
      <Link to="/gameBoard">
        <button>New Game</button>
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
              <Route exact path="/gameBoard" component={GameBoard} />
              <Route exact path="/chatRoom" component={ChatRoom} />
              </div>
            </div>
          </Router>
        );
      }
    }


export default App;
