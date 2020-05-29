import React from 'react';
import LandingSVG from '../../components/LandingSVG';
import Typer from '../../components/Typer';
import './styles.css';

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
      <div style={{ margin: '20%' }} />
    </div>
  );
};

export default Landing;
