import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './lineup.css'
import genericCrowdImage from '../../img/crowd.jpeg'

class Lineup extends Component {
   constructor(props){
     super(props);
     let name = this.props.location.state ? this.props.location.state.name : ""
     let year = this.props.location.state ? this.props.location.state.year : ""
     this.state = {
        festival: [],
        noFestivalExists: false,
        activeGroup: "",
        activeArtists: 0,
        name: name || "",
        year: year || ""
     }

     this.renderLineup = this.renderLineup.bind(this)
     this.handleArtistClick = this.handleArtistClick.bind(this)
     this.setLocalStorage = this.setLocalStorage.bind(this)
     this.localStorageToState = this.localStorageToState.bind(this)
     this.handleCategoryClick = this.handleCategoryClick.bind(this)
     this.countActiveArtists = this.countActiveArtists.bind(this)
  }

   async componentDidMount() {
      let id = this.props.location.pathname.split("/")[2]
      let { stateSet, festival } =  await this.localStorageToState(id)
      if (stateSet) {
         this.setState({ festival, activeGroup: festival[0].name }, () => {
            this.countActiveArtists()
         })
      } else {
         fetch(`http://localhost:5000/api/v1/festivalgroupings/${id}`)
            .then(res => res.json())
            .then(response => {
               if (response.success) {
                  this.setState({ festival: response.data, activeGroup: response.data[0].name }, () => {
                     this.countActiveArtists()
                  })
               } else {
                  this.setState({ noFestivalExists: true })
               }
            })
      }
   }
   countActiveArtists() {
      let count = 0
      this.state.festival.forEach((group, i) => {
         // console.log("group ===> ", group)
         group.artists.forEach((artist, j) => {
            if (artist.active) {
               count++
            }
         })
      })
      this.setState({ activeArtists: count })
   }

   handleArtistClick(artistName) {
      // console.log("artistName ===> ", artistName)
      // console.log("this.state.festival.artists ===> ", this.state.festival.artists)
      let festival = Object.assign([], this.state.festival)
      // console.log("festival ===> ", festival)
      for (let group of festival) {
         if (group.name === this.state.activeGroup) {
            group.artists.forEach((artist, i) => {
               if (artist.name === artistName) {
                  artist.active = !artist.active
                  this.countActiveArtists()
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
      let festival = localStorage.getItem(id);
      festival = JSON.parse(festival)
      if (festival) {
         stateSet = true
      }
      return {stateSet, festival}
   }

   setLocalStorage() {
      let id = this.props.location.pathname.split("/")[2]
      localStorage.setItem(id, JSON.stringify(this.state.festival))
   }

   handleCategoryClick(groupName) {
      this.setState({ activeGroup: groupName })
   }

   handleCatNameCreation(groupName) {
      let groupNameArray = []
      groupName = groupName.split('/')
      groupName.forEach((name, i) => {
         let nameElement = (
            <span key={i} className="category_name">{name}</span>
         )
         groupNameArray.push(nameElement)
      })
      return groupNameArray
   }

   renderCategories() {
      // console.log("this.state.festival ===> ", this.state.festival)
      let categories = []
      if (this.state.festival.length) {
         this.state.festival.forEach((group, i) => {
            let groupNames = this.handleCatNameCreation(group.name)
            // console.log("groupNames ===> ", groupNames)
            let category = (
               <div key={i} onClick={() => {this.handleCategoryClick(group.name)}} className={"category_item_container" + (group.name === this.state.activeGroup ? " active" : "")}>
                  <div className="category_name_container">
                     {groupNames}
                  </div>
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
                           <span className="plus">{artist.active ? "–" : "+"}</span>
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
            <div className="category_container">
               {this.renderCategories()}
            </div>
            <div className="lineup_container">
               {this.renderLineup()}
            </div>
            <div className="footer_ctas_spacer">

            </div>
            <div className="footer_ctas">
               <div className="selected_artists">Selected Artists: {this.state.activeArtists || 0}</div>
               <Link to={{pathname: this.props.location.pathname + "/create", state: this.state}} className="create_playlists">Create Playlists</Link>
            </div>
         </div>
      );

   }

}

export default Lineup;
