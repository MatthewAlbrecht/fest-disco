import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './lineup.css'
import genericCrowdImage from '../../img/crowd.jpeg'

class Lineup extends Component {
   constructor(props){
     super(props);
     this.state = {
        festival: {},
        noFestivalExists: false
     }

     this.renderLineup = this.renderLineup.bind(this)
     this.handleArtistClick = this.handleArtistClick.bind(this)
     this.setLocalStorage = this.setLocalStorage.bind(this)
  }

   componentDidMount() {
         let pathname = this.props.location.pathname.split("/")[2].split("_")
         let [name, year] = pathname
         localStorage.getItem('festival');

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

   handleArtistClick(artistName) {
      console.log("artistName ===> ", artistName)
      console.log("this.state.festival.artists ===> ", this.state.festival.artists)
      let festival = Object.assign({}, this.state.festival)
      for (let artist of festival.artists) {
         if (artist.name === artistName) {
            artist.active = !artist.active
            console.log("artist.name, artistName ===> ", artist.active, artistName)
            break;
         }
      }
      this.setState({ festival })
      // this.setLocalStorage()
   }

   setLocalStorage() {
      let pathname = this.props.location.pathname.split("/")[2].split("_")
      let [name, year] = pathname
      let festivals = localStorage.getItem("festivals")
      if (festivals) {
         festivals = JSON.parse(festivals)
         if (festivals.length > 0) {
            for (let festival of festivals) {
               if (festival.name === name && festival.year === +year) {
                  festival = this.state.festival
                  // TODO: if no hits then PUSH new festival on local storage
                  break;
               }
            }
            localStorage.setItem("festivals", JSON.stringify([this.state.festival]))
         }
      } else {
         localStorage.setItem("festivals", JSON.stringify([this.state.festival]))
      }

   }

   renderLineup() {
      if (this.state.festival.artists) {
         let artistModules = []
         this.state.festival.artists.forEach((artist, i) => {
            let imgUrl
            let style
            if (artist._id && artist._id.images && artist._id.images[0]) {
               imgUrl = artist._id.images[0].url
               style = {
                  backgroundImage: `url('${imgUrl}')`
               }
            } else {
               style = {
                  backgroundImage: `url('${genericCrowdImage}')`
               }
            }
            // console.log("artist ===> ", artist)
            let module = (
               <div
                  key={i}
                  style={style}
                  className={"artist" + (artist.active ? " active" : "")}
                  onClick={() => {this.handleArtistClick(artist.name)}}
                  >
                  <h3 className="artist_name">{artist.name}</h3>
                  <div className="overlay"></div>
                  <div className="overlay_color"></div>
                  <div className="add_artist_container">
                     <span className="plus">+</span>
                  </div>
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
            <h1 className="select_artist_header">Select Artists</h1>
            {this.renderLineup()}
         </div>
      );

   }

}

export default Lineup;
