import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './festivals.css'

class Festivals extends Component {
   constructor(props){
     super(props);
     this.state = {
        festivals: []
     }
   }
   componentDidMount() {
      console.log("this.state.user ===> ", this.props.user)
      fetch('http://localhost:5000/api/v1/festivals')
         .then(res => res.json())
         .then(festivals => {
            // console.log("festivals ===> ", festivals)
            this.setState({ festivals: festivals.data })
         })
         .catch(err => {
            console.log("err ===> ", err)
         })
   }

   render() {
      console.log("this.state ===> ", this.state)
      return(

         <div className="container">
            <h1>Hi you made it to festivals</h1>
            {this.state.festivals.map((festival, i) => {
               return (
                  <div key={i}>
                     <Link to={{pathname: '/festivals/'+festival.name+'_'+festival.year}}>{festival.name}</Link>
                  </div>
               )
            })}
         </div>
      );

   }

}

export default Festivals;
