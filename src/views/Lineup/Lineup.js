import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './lineup.css'

class Lineup extends Component {
   constructor(props){
     super(props);
     this.state = {
        festival: {},
        noFestivalExists: false
     }

     this.renderLineup = this.renderLineup.bind(this)
   }
   componentDidMount() {
         let pathname = this.props.location.pathname.split("/")[2].split("_")
         let [name, year] = pathname
         console.log("name, year ===> ", name, year)
         fetch(`http://localhost:5000/api/v1/festivals/${name}/${year}`)
            .then(res => res.json())
            .then(response => {
               if (response.success) {
                  this.setState({ festival: response.data })
               } else {
                  this.setState({ noFestivalExists: true })
               }
            })
   }

   renderLineup() {
      if (this.state.festival.artists) {
         let artistModules = []
         this.state.festival.artists.forEach((artist, i) => {
            console.log("artist ===> ", artist)
            let module = (
               <div key={i}>
                  <h3>{artist.name}</h3>
                  {(artist._id && artist._id.images[0]) ?
                     <img src={artist._id.images[0].url} />
                     : null}

               </div>
            )
            artistModules.push(module)
         })
         return artistModules
      } else {
         return null
      }
   }

   render() {
      if (this.state.noFestivalExists) {
         return (
            <Redirect to={'/festivals'} />
         )
      }
      return(
         <div>
            <h1>MADE IT TO LINEUP PAGE</h1>
            {this.renderLineup()}
         </div>
      );

   }

}

export default Lineup;
