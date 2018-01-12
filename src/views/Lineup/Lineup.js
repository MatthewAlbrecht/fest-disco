import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './lineup.css'
import genericCrowdImage from '../../img/crowd.jpeg'

class Lineup extends Component {
   constructor(props){
     super(props);
     this.state = {
        festival: [],
        noFestivalExists: false,
        activeGroup: ""
     }

     this.renderLineup = this.renderLineup.bind(this)
     this.handleArtistClick = this.handleArtistClick.bind(this)
     this.setLocalStorage = this.setLocalStorage.bind(this)
     this.localStorageToState = this.localStorageToState.bind(this)
     this.handleCategoryClick = this.handleCategoryClick.bind(this)
  }

   componentDidMount() {
      let id = this.props.location.pathname.split("/")[2]
      let stateSet = this.localStorageToState(id)
      console.log("this.state ===> ", this.state)
      if (stateSet) {
         fetch(`http://localhost:5000/api/v1/festivalgroupings/${id}`)
         .then(res => res.json())
         .then(response => {
            if (response.success) {
               this.setState({ festival: response.data, activeGroup: response.data[0].name })
            } else {
               this.setState({ noFestivalExists: true })
            }
         })
      }
   }

   handleArtistClick(artistName) {
      // console.log("artistName ===> ", artistName)
      // console.log("this.state.festival.artists ===> ", this.state.festival.artists)
      let festival = Object.assign([], this.state.festival)
      console.log("festival ===> ", festival)
      for (let group of festival) {
         if (group.name === this.state.activeGroup) {
            group.artists.forEach((artist, i) => {
               if (artist.name === artistName) {
                  artist.active = !artist.active
                  // console.log("artist.name, artistName ===> ", artist.active, artistName)
               }
            })
         }
      }
      this.setState({ festival }, ()=> {
         this.setLocalStorage()
      })
   }

   localStorageToState(id) {
      let stateSet = false
      let festivals = localStorage.getItem('festivals');
      // console.log("festivals ===> ", festivals)
      if (festivals) {
         festivals = JSON.parse(festivals)
         festivals.forEach((festival, i) => {
            if (festival && festival[0] && festival[0].festivalId === id) {
               this.setState({ festival: festival, activeGroup: festival[0].name }, () => {
                  // console.log("this.state ===> ", this.state)
                  stateSet = true
               })
            }
         })
      }
      return stateSet
   }

   setLocalStorage() {
      let id = this.props.location.pathname.split("/")[2]
      // console.log("this.state ===> ", this.state.festival)
      let festivals = localStorage.getItem("festivals")
      festivals = JSON.parse(festivals)
      if (festivals) {
         let festHit = false
         for (let festival of festivals) {
            if (festival[0] && festival[0].festivalId === id) {
               festival.forEach((group, i) => {
                  // console.log("group.artists ===> ", group.artists)
                  // console.log("group state ", this.state.festival[i].artists)
                  group.artists = this.state.festival[i].artists
               })
                  festHit = true
                  break;
            }
         }
         if (!festHit) {
            festivals.push(this.state.festival)
         }
         console.log("festivals ===> ", festivals)
         localStorage.setItem("festivals", JSON.stringify(festivals))
      } else {
         localStorage.setItem("festivals", JSON.stringify([this.state.festival]))
      }

   }
   handleCategoryClick(groupName) {
      this.setState({ activeGroup: groupName })
   }
   renderCategories() {
      console.log("this.state.festival ===> ", this.state.festival)
      let categories = []
      if (this.state.festival.length) {
         this.state.festival.forEach((group, i) => {
            let category = (
               <div key={i} onClick={() => {this.handleCategoryClick(group.name)}} className={"category_container" + (group.name === this.state.activeGroup ? " active" : "")}>
                  {group.name}
               </div>
            )
            categories.push(category)
         })
      }
      return categories
   }
   renderLineup() {
      if (this.state.festival.length) {
         let artistModules = []
         this.state.festival.forEach((group, festivalInterval) => {
            // console.log("group ===> ", group)
            if (group.name === this.state.activeGroup) {
               // console.log("group.name ===> ", group.name)
               group.artists.forEach((artist, i) => {
                  // console.log("artist ===> ", artist)
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
            }
            // console.log("artistModules ===> ", artistModules)
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
            {this.renderCategories()}
            {this.renderLineup()}
         </div>
      );

   }

}

export default Lineup;
