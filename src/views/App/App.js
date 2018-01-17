import React, { Component } from 'react';
import './App.css';
import logo from '../../img/viibly_logo.svg'

class App extends Component {
   constructor(props){
     super(props);
     this.state = {
        loginURI: `https://accounts.spotify.com/authorize?client_id=cdbad3fca6e246fc844cf598440f2b93&response_type=code&redirect_uri=${process.env.REACT_APP_UI_URL}/cb&scope=user-read-private%20user-read-email%20playlist-modify-private%20playlist-modify-public`
     }

     this.handleLoginClick = this.handleLoginClick.bind(this)
   }

   handleLoginClick() {
      console.log("this.state.loginURI ===> ", this.state.loginURI)
      // window.location = this.state.loginURI
   }
  render() {
    return (
      <div className="App">
          <h1 className="logo">viibly</h1>
          <p className="splash_blurb">With Viibly you can create and discover curated Spotify playlist curated based on your next music festival.</p>
          <div className="login" onClick={this.handleLoginClick}><i className="fa fa-spotify" aria-hidden="true"></i><span className="login_text">Login to Spotify</span></div>
      </div>
    );
  }
}

export default App;
