import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Callback from './Callback';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/cb' component={Callback} />
    </div>
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
