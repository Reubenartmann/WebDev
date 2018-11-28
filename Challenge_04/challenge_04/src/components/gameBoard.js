import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase.js'


class GameBoard extends Component {




  render() {
      return (
        <div className='app'>
          <header>
              <div className='wrapper'>
                <h1>Home</h1>
              </div>
          </header>
        </div>
        )
      }
  }



export default GameBoard;
