import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import Whiteboard from './components/Whiteboard/Whiteboard';
import keycloak from './services/AuthService';

const App: React.FC = () => {
  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={() => <h1>Login Page</h1>} />
        <PrivateRoute path="/whiteboard">
          <Whiteboard />
        </PrivateRoute>
        <Route path="/" exact component={() => <h1>Welcome</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
