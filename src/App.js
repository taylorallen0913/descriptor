import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/NavBar';

import Landing from './pages/Landing';

const App = () => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
  );
};

export default App;
