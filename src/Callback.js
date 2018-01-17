import React, { Component } from 'react';
import { Redirect } from 'react-router'
import queryString from 'query-string';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class App extends Component {
   constructor(props){
     super(props);
     this.state = {
        cookiesSet: false
     }
     this.requestAccessAndRefresh = this.requestAccessAndRefresh.bind(this)
   }

   componentDidMount() {
      this.props.location.parsedSearch = queryString.parse(this.props.location.search)
      console.log("this.props ===> ", this.props)
      this.requestAccessAndRefresh(this.props.location.parsedSearch)
      // console.log("parsed ===> ", parsed)
   }
   requestAccessAndRefresh(search) {
      console.log("======> WE ARE IN requestAccessAndRefresh FE")
      let code = { code: search.code || null}
      console.log("code ===> ", code)
      fetch('http://localhost:5000/api/v1/login/accessAndRefresh', {
         method: 'POST',
         body: JSON.stringify(code),
         headers: {
            'Content-Type': 'application/json'
         }
      })
      .then(res => res.json())
      .then(response => {
         console.log("response ===> ", response)
         console.log("response.data ===> ", response.data)
         cookies.set('user', JSON.stringify(response.data))
         this.setState({ cookiesSet: true })
      })
      .catch(err => {
         console.log("err ===> ", err)
      })
   }

  render() {
     if (this.state.cookiesSet) {
        return (
           <Redirect to='/festivals' />
        )
     }
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
