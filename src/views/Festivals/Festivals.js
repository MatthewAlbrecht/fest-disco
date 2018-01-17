import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './festivals.css'
import genericCrowdImage from '../../img/crowd.jpeg'

class Festivals extends Component {
   constructor(props){
     super(props);
     this.state = {
        festivals: []
     }
   }
   componentDidMount() {
      console.log("this.state.user ===> ", this.props.user)
      fetch(process.env.REACT_APP_API_URL + '/festivals')
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
            <h1 className="select_festival_header">Select Festival</h1>
            {this.state.festivals.map((festival, i) => {

               let imgUrl
               let style
               if (festival && festival.image_url) {
                  imgUrl = festival.image_url
                  style = {
                     backgroundImage: `url('${imgUrl}')`
                  }
               } else {
                  style = {
                     backgroundImage: `url('${genericCrowdImage}')`
                  }
               }
               console.log("festival.year ===> ", festival.year)
               return (
                  <Link  to={{pathname: '/festivals/'+festival._id, state: { name: festival.name, year: festival.year } }} style={style} className="festival" key={i}>
                     <h2 className="festival_name">{festival.name}</h2>
                     <h3 className="festival_year">{festival.year}</h3>
                     <div className="overlay"></div>
                     <div className="overlay_color"></div>
                  </Link>
               )
            })}
         </div>
      );

   }

}

export default Festivals;
