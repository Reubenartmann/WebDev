import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase.js'

class GameBoard extends React.Component{

      constructor(props) {
          super(props);
          this.state = {
            p1: 1,
            p2: 2,
            currentP: null,
            board: [],
            gameStatus: false,
            message: '',
            row: '',
            column: '',
            owner:'',
            accounts:[],
            pAccountId: '',
            mostRecentTurn: [],
            rowCounter: [],
          }
          this.initBoard = this.initBoard.bind(this);
          this.place = this.place.bind(this);
          this.play = this.play.bind(this);
          this.playerSelected = this.playerSelected.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleChange = this.handleChange.bind(this);
        }
        handleChange(e) {
          this.setState({
            [e.target.name]: e.target.value
          });
        }
        initBoard() {
          const boardRef = firebase.database().ref(`/activeBoard/`);
          boardRef.remove();
          let board = [];
          let rowcounter = [];
          for (let tempRow = 0; tempRow < 3; tempRow++) {
            let row = [];

            for (let tempColumn = 0; tempColumn < 3; tempColumn++) {
              row.push(null)
            }
            board.push(row);
            rowcounter.push(tempRow);
          }
          this.setState({
            board,
            currentP: this.state.p1,
            gameStatus: false,
            message: '',
            rowCounter: rowcounter,
          });
        }
        componentWillMount() {
          this.initBoard();
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
          const brRef = firebase.database().ref('activeBoard');
          brRef.on('value', (snapshot) => {
            console.log("move is made")
            let brshot = snapshot.val();
            let newState2 = [0,1];
            for (let brrr in brshot) {
              newState2 = ({
                column: brshot[brrr].column,
                row: brshot[brrr].row,
                pAccountId: brshot[brrr].pAccountId
              });
            }

            this.place(newState2.column, newState2.row)
              console.log("this.place reached in componentdidmount")
            this.setState({
              mostRecentTurn: newState2
            });
          });
        }
        togglePlayer() {
          return (
            this.state.currentP === this.state.p1
            )
            ? this.state.p2 : this.state.p1;
        }
        // checkVertical(board) {
        //   for (let tempRow = 2; tempRow < 3; tempRow++) {
        //     for (let tempColumn = 0; tempColumn < 3; tempColumn++) {
        //       if (board[tempRow][tempColumn]) {
        //         if (board[tempRow][tempColumn] === board[tempRow - 1][tempColumn] &&
        //             board[tempRow][tempColumn] === board[tempRow - 2][tempColumn] &&
        //             board[tempRow][tempColumn] === board[tempRow - 3][tempColumn]) {
        //           return board[tempRow][tempColumn];
        //         }
        //       }
        //     }
        //   }
        // }

        // checkHorizontal(board) {
        //   // Check only if column is 3 or less
        //   for (let tempRow = 0; tempRow < 3; tempRow++) {
        //     for (let tempColumn = 0; tempColumn < 3; tempColumn++) {
        //       if (board[tempRow][tempColumn]) {
        //         if (board[tempRow][tempColumn] === board[tempRow][tempColumn + 1] &&
        //             board[tempRow][tempColumn] === board[tempRow][tempColumn + 2] &&
        //             board[tempRow][tempColumn] === board[tempRow][tempColumn + 3]) {
        //           return board[tempRow][tempColumn];
        //         }
        //       }
        //     }
        //   }
        // }

        // checkDiagonalRight(board) {
        //   // Check only if row is 3 or greater AND column is 3 or less
        //   for (let tempRow = 2; tempRow < 3; tempRow++) {
        //     for (let tempColumn = 0; tempColumn < 3; tempColumn++) {
        //       if (board[tempRow][tempColumn]) {
        //         if (board[tempRow][tempColumn] === board[tempRow - 1][tempColumn + 1] &&
        //             board[tempRow][tempColumn] === board[tempRow - 2][tempColumn + 2] &&
        //             board[tempRow][tempColumn] === board[tempRow - 3][tempColumn + 3]) {
        //           return board[tempRow][tempColumn];
        //         }
        //       }
        //     }
        //   }
        // }

        // checkDiagonalLeft(board) {
        //   // Check only if row is 3 or greater AND column is 3 or greater
        //   for (let tempRow = 2; tempRow < 3; tempRow++) {
        //     for (let tempColumn = 2; tempColumn < 3; tempColumn++) {
        //       if (board[tempRow][tempColumn]) {
        //         if (board[tempRow][tempColumn] === board[tempRow - 1][tempColumn - 1] &&
        //             board[tempRow][tempColumn] === board[tempRow - 2][tempColumn - 2] &&
        //             board[tempRow][tempColumn] === board[tempRow - 3][tempColumn - 3]) {
        //           return board[tempRow][tempColumn];
        //         }
        //       }
        //     }
        //   }
        // }

        // checkDraw(board) {
        //   for (let tempRow = 0; tempRow < 3; tempRow++) {
        //     for (let tempColumn = 0; tempColumn < 3; tempColumn++) {
        //       if (board[tempRow][tempColumn] === null) {
        //         return null;
        //       }
        //     }
        //   }
        //   return 'draw';
        // }

        checkAll(board) {
          //return this.checkVertical(board) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board) || this.checkDraw(board);
        }
        handleSubmit(e) {
          console.log("handlesubcalled")
          const boardRef = firebase.database().ref('activeBoard');
          const sub = {
            column: this.state.column,
            row: this.state.row,
            owner: this.state.owner,
            pAccountId: this.state.pAccountId
          }
          boardRef.push(sub);
          this.setState({
            column: '',
            row:'',
            owner:''
          });
        }
        play(tempColumn, tempRow) {
          console.log(tempColumn, tempRow)
          if (!this.state.gameStatus && this.state.pAccountId != '' && this.state.pAccountId !== this.state.mostRecentTurn.pAccountId) {

            let board = this.state.board;
              if (!board[tempRow][tempColumn]) {
                //board[tempRow][tempColumn] = this.state.currentP;
                this.state.column = tempColumn;
                this.state.row = tempRow;
                this.state.owner = this.state.currentP;
                this.handleSubmit();

                let result = this.checkAll(board);
                if (result === this.state.p1) {
                this.setState({ board, gameStatus: true, message: 'Player 1 (red) wins!' });

                } else if (result === this.state.p2) {
                this.setState({ board, gameStatus: true, message: 'Player 2 (yellow) wins!' });
                } else if (result === 'draw') {
                this.setState({ board, gameStatus: true, message: 'Draw game.' });
                } else {
                this.setState({ board, currentP: this.togglePlayer() });
                }

              }


          }
          else if (!this.state.gameStatus && this.state.pAccountId == ''){
            this.setState({ message: 'Please Select an Account' });
          }
          else if (!this.state.gameStatus && this.state.pAccountId == this.state.mostRecentTurn.pAccountId){
            this.setState({ message: 'Please wait your turn' });
          }
          else {
            this.setState({ message: 'Game over. Please start a new game.' });
          }
        }
        place(tempColumn, tempRow) {
          console.log("palce called")

            let boaard = [];
            boaard = this.state.board;

                if(this.state.pAccountId != ''){
                boaard[tempRow][tempColumn] = this.state.currentP;
                this.state.column = tempColumn;
                this.state.row = tempRow;
                this.state.owner = this.state.currentP;

                let result = this.checkAll(boaard);
                if (result === this.state.p1) {
                this.setState({ boaard, gameStatus: true, message: 'Player 1 (red) wins!' });

                } else if (result === this.state.p2) {
                this.setState({ boaard, gameStatus: true, message: 'Player 2 (yellow) wins!' });
                } else if (result === 'draw') {
                this.setState({ boaard, gameStatus: true, message: 'Draw game.' });
                } else {
                this.setState({ boaard, currentP: this.togglePlayer() });
                }
              }





        }
        playerSelected(e){
          e.preventDefault();
          if(this.state.pAccountId !== ''){
          }
        }
      render() {
          return (
            <div>
              <div id='playerSelections'>
              <section>
              <form onSubmit={this.playerSelected}>

                <select id="pAccountIdSelector" name="pAccountId" placeholder="Who... Are you?" onChange={this.handleChange} value={this.state.pAccountId} >
                <option value="" disabled selected>Select your account</option>
                {this.state.accounts.map((accountsLocal) => {
                    return (
                      <option value={accountsLocal.id}>{accountsLocal.name}</option>
                      )
                    })}
                  </select>
                  </form>
                  </section>
                  </div>
                  <br></br>
              <div id='burd'>
              <div>
                <button className="button" onClick={() => {this.initBoard()}}>New Game</button>
              </div>
              <table>
              <tbody>
              {this.state.board.map((row , y) => (<Row key={y} row={row} rowCounter={y} play={this.play} />))}
              </tbody>
              </table>
              <p className="message">{this.state.message}</p>
              </div>
            </div>

          )
      };
  }
  const Row = ({ row, play, rowCounter }) => {
    return (
      <tr>
        {row.map((cell, i, row) => <Cell key={i} value={cell} columnIndex={i} rowIndex={rowCounter} play={play} />)}

      </tr>
    );
  };
  const Cell = ({ value, columnIndex, rowIndex, play }) => {
    let color = 'white';
    if (value === 1) {
      color = 'red';
    } else if (value === 2) {
      color = 'yellow';
    }
    return (
      <td>
        <div className="cell" onClick={() => {play(columnIndex,rowIndex)}}>
          <div className={color}></div>
        </div>
      </td>
    );
  };

export default GameBoard;
