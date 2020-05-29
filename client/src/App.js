import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route path="/" component={Landing} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
