import React from 'react';
import LandingSVG from '../../components/LandingSVG';
import Typer from '../../components/Typer';
import About from '../../components/About';
import Navbar from '../../components/Navbar';

import './styles.css';

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="wave-container">
        <h1 className="landing-title">
          <Typer />
        </h1>
        <div style={{ marginTop: '5%' }} />
        <LandingSVG />
      </div>
      <div style={{ margin: '10%' }} />
      <About />
      <div style={{ marginBottom: '40%' }} />
    </div>
  );
};

export default Landing;
