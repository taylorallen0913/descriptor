import React, { useEffect, useState } from 'react';

import './styles.css';

const TextOutput = (props) => {
  const NotesOutput = () => {
    const output = props.output;
    const outputList = output
      .split('\n')
      .map((sentence) => <li className="bullet">{sentence}</li>);
    return <ul>{outputList}</ul>;
  };

  return (
    <div className="text-output" style={{ marginTop: `${props.margin}%` }}>
      <div className="text-output-content">
        <NotesOutput output={props.output} />
      </div>
    </div>
  );
};

export default TextOutput;
