import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import Callback from './Callback';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
require('dotenv').config()

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
  <BrowserRouter>
    <div>
      <Switch>
         <Route exact path='/' component={App} />
         <Route exact path='/cb' component={Callback} />
         <Route path='/' component={Routes} />
      </Switch>
    </div>
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
