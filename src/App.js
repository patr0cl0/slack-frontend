import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import CreateTeam from './routes/CreateTeam';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import ViewTeam from './routes/ViewTeam';
import { StateContext } from './state';
import { getJWTPayload, hasValidAuthentication } from './utils';

const App = () => {
  const { user = {} } = getJWTPayload();

  return (
    <StateContext.Provider value={{ user }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/login" component={Login} />
          {hasValidAuthentication() && [
            <Route key="create-team" exact path="/create-team" component={CreateTeam} />,
            <Route key="view-team" exact path="/view-team/:teamId?/:channelId?" component={ViewTeam} />,
            <Redirect key="redirect-view-team" to="/view-team/" />,
          ]}
          <Redirect to="/" />
        </Switch>
      </Router>
    </StateContext.Provider>
  );
};

export default App;
