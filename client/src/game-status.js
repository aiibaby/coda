// react component card

import React, { Component } from "react";
import "./styles/App.css";

//TODO: DropDown component for selecting number to guess
//TODO: different renders

/* TODO: 
class DropDown extends Component {

} */



class GameStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: "0,1,2,3,4,5,6,7,8,9,10,11,Joker".split(",")
    };
  }
  /* renderStart */
  renderStart = () => {
    return (
      <div className="gameStatusStart">
        <div className="msg1">
          Welcome {this.props.states.playerStatus.userName}!
        </div>
        <div className="msg2">
          Click <strong>Start</strong> to play{" "}
        </div>
        <button onClick={() => this.props.gameBegin()} className="start-btn">
          Start
        </button>
      </div>
    );
  };

  renderSetup = () => {
    /* render Setup 
      deal 3 cards to player and computer
      onClick = computerTurn()
    */
    return (
      <div className="gameStatusComputerTurn">
        <div className="msg1">Let's Begin! </div>
        <div className="black" />
        <div className="numOfBlacks">
          X
          {
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "B"
            ).length
          }
        </div>
        <div className="white" />
        <div className="numOfWhites">
          X
          {
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "W"
            ).length
          }
        </div>
        <button
          onClick={() => this.props.computerTurn()}
          className="continue-btn"
        >
          Begin
        </button>
      </div>
    );
  };

  /* renderComputerTurn */
  renderComputerTurn = () => {
    return (
      <div className="gameStatusComputerTurn">
        <div className="msg1">Computer Turn!</div>
        <div className="msg2">{this.props.states.pool.length?"Computer drew a card":""}</div>
        <div className="black" />
        <div className="numOfBlacks">
          X
          {
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "B"
            ).length
          }
        </div>
        <div className="white" />
        <div className="numOfWhites">
          X
          {
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "W"
            ).length
          }
        </div>

        <button
          onClick={() => this.props.computerMakeGuess()}
          className="continue-btn"
        >
          Next
        </button>
      </div>
    );
  };

  /* renderComputerSuccess */
  renderComputerTurnResult = () => {
    return (
      <div className="gameStatusComputerTurn">
        <div className="msg1">
          {this.props.states.wasComputerCorrect
            ? "Computer Guessed Correctly"
            : "Computer Failed"}
        </div>
        <div className="msg2">
          {this.props.states.wasComputerCorrect
            ? "Computer revealed your card"
            : "Computer's card is revealed"}
        </div>
        <div className="black" />
        <div className="numOfBlacks">
          X
          {
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "B"
            ).length
          }
        </div>
        <div className="white" />
        <div className="numOfWhites">
          X
          {
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "W"
            ).length
          }
        </div>
        
        <button
          onClick={() => this.props.playerTurn()}
          className="continue-btn"
        >
          Continue
        </button>
      </div>
    );
  };

  /* renderPlayerTurn */
  renderPlayerTurn = () => {
    // TODO: add Manual component
    return (
      <div className="gameStatusPlayerTurn">
        <div className="msg1">Your Turn!</div>
        <div className="msg2">Make a guess</div>
        <div
          onClick={
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "B").length?
              !this.props.states.didPlayerDraw 
                ? () => this.props.dealBlack()
                : () => alert("you already drew a card")
            :()=>{console.log('empty b pool')}
          }
          className="black"
        />
        <div className="numOfBlacks">
          X
          {
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "B"
            ).length
          }
        </div>
        <div
          onClick={
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "W").length?
                !this.props.states.didPlayerDraw
                  ? () => this.props.dealWhite()
                  : () => alert("you already drew a card")
              :()=>{console.log('empty whiteppol')}
          }
          className="white"
        />
        <div className="numOfWhites">
          X
          {
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "W"
            ).length
          }
        </div>
        <input
          className="textInput"
          placeholder="Guess a number {0-11} or joker e.g. 8 or j"
          type="text"
          onChange={this.props.guessNum}
        />
        <button
          onClick={
            this.props.states.didPlayerDraw
              ? this.props.states.didPlayerGuessNum &&
                this.props.states.didPlayerSelect
                ? () => this.props.makeGuess()
                : () => alert("Your must select / guess")
              : () => alert("You must draw a card first!")
          }
          className="guess-btn"
        >
          Guess
        </button>
      </div>
    );
  };

  /* renderPlayerTurnSuccess */
  renderPlayerTurnSuccess = () => {
    return (
      <div className="gameStatusPlayerTurnSuccess">
        <div className="msg1">You Guessed Correctly!</div>
        <div className="msg2">You can keep guessing or skip your turn</div>
        <div className="black" />
        <div className="numOfBlacks">
          X
          {
            this.props.states.pool.filter(cardName => cardName.slice(0, 1) === "B")
              .length
          }
        </div>
        <div className="white" />
        <div className="numOfWhites">
          X
          {
            this.props.states.pool.filter(cardName => cardName.slice(0, 1) === "W")
              .length
          }
        </div>
        
        <button onClick={() => this.props.reGuess()} className="guess-btn">
          Guess Again!
        </button>
        <button
          onClick={() => this.props.computerTurn()}
          className="next-btn"
        >
          Skip
        </button>
      </div>
    );
  };

  /* renderPlayerFail */
  renderPlayerTurnFail = () => {
    return (
      <div className="gameStatusPlayerTurnFail">
        <div className="msg1">You guessed wrong number!</div>

        <div className="msg2">Your card is revealed</div>
        <div className="black" />
        <div className="numOfBlacks">
          X
          {
            this.props.states.pool.filter(cardName => cardName.slice(0, 1) === "B")
              .length
          }
        </div>
        <div className="white" />
        <div className="numOfWhites">
          X
          {
            this.props.states.pool.filter(cardName => cardName.slice(0, 1) === "W")
              .length
          }
        </div>
        
        <button onClick={() => this.props.computerTurn()} className="next-btn">
          continue
        </button>
      </div>
    );
  };

  renderPlayerReguess = () => {
    // TODO: add Manual component
    return (
      <div className="gameStatusPlayerReguess">
        <div className="msg1">Your Turn!</div>
        <div className="msg2">Make a re-guess</div>
        <div className="black"/>
        <div className="numOfBlacks">
          X
          {
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "B"
            ).length
          }
        </div>
        <div className="white"/>
        <div className="numOfWhites">
          X
          {
            this.props.states.pool.filter(
              cardName => cardName.slice(0, 1) === "W"
            ).length
          }
        </div>
        <input
          className="textInput"
          placeholder="Guess a number {0-11} or joker e.g. 8 or j"
          type="text"
          onChange={this.props.guessNum}
        />
        <button
          onClick={
            this.props.states.didPlayerDraw
              ? this.props.states.didPlayerGuessNum &&
                this.props.states.didPlayerSelect
                ? () => this.props.makeGuess()
                : () => alert("Your must select / guess")
              : () => alert("You must draw a card first!")
          }
          className="guess-btn"
        >
          Guess
        </button>
      </div>
    );
  };
  /* renderEnd */
  renderEnd = () => {
    return (
      <div className="gameStatusStart">
        <div className="msg1">{this.props.states.winner} Won!</div>
        <div className="msg2">
          Click <strong>Start</strong> to play again{" "}
        </div>
        <button onClick={() => this.props.reset()} className="start-btn">
          Start
        </button>
      </div>
    );
  };

  render() {
    if (this.props.states.turn === 0) {
      return this.renderStart();
    } else if (this.props.states.turn === 1) {
      return this.renderSetup();
    }

    if (this.props.states.finished) {
      return this.renderEnd();
    }

    if (this.props.states.turn > 1) {
      if (!this.props.states.isPlayerTurn) {
        // computer's turn
        if (this.props.states.didComputerGuess) {
          // computer Guessed
          return this.renderComputerTurnResult();
        } else {
          // computer not guessed
          return this.renderComputerTurn();
        }
      } else {
        // player turn
        if (this.props.states.didPlayerMakeGuess) {
          if (this.props.states.wasPlayerCorrect) {
            return this.renderPlayerTurnSuccess();
            // player success
          } else {
            return this.renderPlayerTurnFail();
            // player fial
          }
        } else {
          if (this.props.states.reGuess){
            return this.renderPlayerReguess();
          } else {
            return this.renderPlayerTurn();
          }
          // player turn begin
        }
      }
    }
  }
}

export default GameStatus;
