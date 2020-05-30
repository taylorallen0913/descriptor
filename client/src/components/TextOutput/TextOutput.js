import React from 'react';

import './styles.css';

const TextOutput = (props) => {
  console.log(props);
  return (
    <div className="text-output" style={{ marginTop: `${props.margin}%` }}>
      <div className="text-output-content">
        <h1>{props.text}</h1>
      </div>
    </div>
  );
};

export default TextOutput;
