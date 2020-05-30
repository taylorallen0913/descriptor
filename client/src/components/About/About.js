import React from 'react';
import {
  Columns,
  Card,
  Media,
  Content,
  Image,
  Heading,
} from 'react-bulma-components';

import './styles.css';

const About = () => {
  return (
    <div>
      <h1 className="about-title">
        The world we live in is cluttered with countless information.
      </h1>
      <p className="about-subtitle">
        Descriptor extracts and organizes the most important information
      </p>
      <Columns gapless>
        <Columns.Column>
          <div className="about-description">
            <h1 className="about-header">Focus on what matters</h1>
            <p className="about-content">
              Descriptor uses a NLP algorithm to process text to rank the most
              significant so you can get the most out of any piece of
              information
            </p>
          </div>
        </Columns.Column>
        <Columns.Column>
          <div className="about-description">
            <h1 className="about-header">Read only what is necessary</h1>
            <p className="about-content">
              Content is often filled with unnecessary material, and Descriptor
              filters this so you can internalize the most crucial knowledge
            </p>
          </div>
        </Columns.Column>
        <Columns.Column>
          <div className="about-description">
            <h1 className="about-header">Multiple use cases</h1>
            <p className="about-content">
              Descriptor is based on an efficient NLP algrithm, which means its
              functionalities can be expanded to numberous use cases
            </p>
          </div>
        </Columns.Column>
      </Columns>
      <div style={{ marginBottom: '10%' }} />
    </div>
  );
};

export default About;
