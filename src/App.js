import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
   constructor(props){
     super(props);
     this.state = {
        loginURI: 'https://accounts.spotify.com/authorize?client_id=cdbad3fca6e246fc844cf598440f2b93&response_type=code&redirect_uri=http://localhost:3000/cb&scope=user-read-private%20user-read-email'
     }

     this.handleLoginClick = this.handleLoginClick.bind(this)
   }

   handleLoginClick() {
      window.location = this.state.loginURI
   }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to FestDisco</h1>
        </header>
        <p className="App-intro">
          To get started, login <a onClick={this.handleLoginClick} className="login">here</a>.
        </p>
      </div>
    );
  }
}

export default App;
