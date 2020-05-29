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
        <div style={{ marginTop: '1.8%' }}>
          <Route path="/" component={Landing} />
        </div>
      </Switch>
    </Router>
  );
};

export default App;
