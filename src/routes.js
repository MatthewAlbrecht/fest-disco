import React, { Component } from 'react';
import Festivals from './views/Festivals'
import Lineup from './views/Lineup'
import Create from './views/Create'
import { Route } from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Routes extends Component {
   constructor(props){
     super(props);
     this.state = {
        user: null
     }

   }

   componentWillMount() {
      // TODO: Check cookies for information and put into props
      let user = cookies.get('user')
      this.setState({ user })
      // this.props.user = user
   }

  render() {
    return (
      <div>
         <Route exact path='/festivals'
            render={(props) =>
               <Festivals {...props} user={this.state.user} />
            }
            />
         <Route exact path='/festivals/:id/create'
            render={(props) =>
               <Create {...props} user={this.state.user} />
            }
            />
         <Route exact path='/festivals/:id'
            render={(props) =>
               <Lineup {...props} user={this.state.user} />
            }
            />
      </div>
    );
  }
}

export default Routes;
