import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './components/GameBoard';
import ServerList from './components/ServerList.js';
import Home from './components/index';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className='navigation'>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/GameBoard">
        <button>New Game</button>
      </Link>
      <Link to="/ServerList">
        <button>Servers</button>
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
              <Route exact path="/" component={Home} />
              <Route exact path="/GameBoard" component={GameBoard} />
              <Route exact path="/ServerList" component={ServerList} />
              </div>
            </div>
          </Router>
        );
      }
    }

    export default App;
