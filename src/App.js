import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Registration from './containers/Register';


const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Registration} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </Router>
);

export default App;
