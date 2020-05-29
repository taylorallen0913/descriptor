import React from 'react';
import './styles.css';
import Typist from 'react-typist';
import LandingSVG from '../../components/LandingSVG';

const Landing = () => {
  return (
    <div>
      <div className="wave-container">
        <h1 className="landing-title">
          <Typist avgTypingDelay={50} startDelay={1000}>
            Quantifying the internet into understandable bits.
          </Typist>
        </h1>
        <div style={{ marginTop: '5%' }} />
        <LandingSVG />
      </div>
      <div style={{ margin: '20%' }} />
    </div>
  );
};

export default Landing;
