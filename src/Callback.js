import React, { Component } from 'react';
import logo from './logo.svg';
import queryString from 'query-string';

class App extends Component {
   constructor(props){
     super(props);
     this.state = {

     }

   }

   componentWillMount() {
      this.props.location.parsedSearch = queryString.parse(this.props.location.search)
      console.log("this.props ===> ", this.props)

      requestAccessAndRefresh(this.props.location.parsedSearch)
      // console.log("parsed ===> ", parsed)
   }
   requestAccessAndRefresh(search) {
      let code = search.code || null
   }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to FestDisco</h1>
        </header>
        <p className="App-intro">
           This is the Callback
        </p>
      </div>
    );
  }
}

export default App;
