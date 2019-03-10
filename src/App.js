import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import CreateTeam from './routes/CreateTeam';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import ViewTeam from './routes/ViewTeam';

const hasValidAuthentication = () => {
  try {
    const token = localStorage.getItem('token');
    const base64Url = token.split('.')[1];
    JSON.parse(window.atob(base64Url));
  } catch (err) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (hasValidAuthentication() ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    ))}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/create-team" component={CreateTeam} />
      <PrivateRoute exact path="/view-team/:teamId?/:channelId?" component={ViewTeam} />
    </Switch>
  </Router>
);

export default App;
