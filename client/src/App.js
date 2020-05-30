import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Footer from './components/Footer';
import Demo from './pages/Demo/Demo';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/demo" component={Demo} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
