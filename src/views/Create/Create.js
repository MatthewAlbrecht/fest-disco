import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './create.css'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Create extends Component {
   constructor(props){
     super(props);
     let festival, name, year
     if (this.props.location && this.props.location.state) {
        festival = this.props.location.state.festival
        name = this.props.location.state.name
        year = this.props.location.state.year
     }
     this.state = {
        festival: festival || [],
        noFestivalExistsFromState: false,
        name: name || "",
        year: year || ""
     }
     this.sendArtistInfo = this.sendArtistInfo.bind(this)
   }
   componentWillMount() {

   }

   sendArtistInfo(discover) {
      console.log(" ===> ", {festival: this.state.festival, discover})
      let { access_token, spotify_id } = cookies.get("user")
      console.log("spotify_id ===> ", spotify_id)
      fetch(process.env.REACT_APP_API_URL + "/playlists/", {
         method: "POST",
         body: JSON.stringify({
            festival: this.state.festival,
            discover,
            access_token,
            spotify_id,
            name: this.state.name,
            year: this.state.year
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      })
         .then(res => res.json())
         .then(response => {
            console.log("response ===> ", response)
         })
   }

   render() {
      if (this.state.noFestivalExistsFromState) {
         return <Redirect to="/festivals"></Redirect>
      }
      return(
         <div className="create_bg">
            <h1 className="your_playlist_header">Your Playlists</h1>
            <div className="create_box createLike">
               <h2 className="create_header">For You</h2>
               <p className="create_blurb">A Curated playlist made just for you based on your <span className="no_wrap">selected artists.</span></p>
               <div className="create_button" onClick={() => { this.sendArtistInfo(false) }}>Add Playlist</div>
               <p className="create_feature">Featuring:</p>
               <h2 className="create_artist">Kendrick Lamar</h2>
            </div>
            <div className="create_box createDiscover">
               <h2 className="create_header">Discovery</h2>
               <p className="create_blurb">A Curated playlist to explore and discover who you <span className="no_wrap">may see.</span></p>
               <div className="create_button" onClick={() => { this.sendArtistInfo(true) }}>Add Playlist</div>
               <p className="create_feature">Featuring:</p>
               <h2 className="create_artist">Kendrick Lamar</h2>
            </div>
         </div>
      );

   }

}

export default Create;
