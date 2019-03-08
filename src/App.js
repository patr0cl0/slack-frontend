import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './containers/Home';
import Registration from './containers/Register';
import Login from './containers/Login';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Registration} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
