import React from 'react';
import LandingSVG from '../../components/LandingSVG';
import './styles.css';
import Typer from '../../components/Typer';

const Landing = () => {
  return (
    <div>
      <div className="wave-container">
        <h1 className="landing-title">
          <Typer />
        </h1>
        <div style={{ marginTop: '5%' }} />
        <LandingSVG />
      </div>
      <div style={{ margin: '10%' }} />
    </div>
  );
};

export default Landing;
