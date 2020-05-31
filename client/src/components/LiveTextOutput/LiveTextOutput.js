import React, { useState } from 'react';
import { Columns, Loader } from 'react-bulma-components';
import axios from 'axios';

import './styles.css';

const LiveTextOutput = (props) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState();

  const onChange = async (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    setLoading(true);
    await axios
      .post('http://localhost:5000/api/summary', {
        input: input,
      })
      .then((res) => {
        if (res.data !== '.') setOutput(res.data);
      })
      .catch((err) => {});
  };

  const NotesOutput = () => {
    try {
      const outputList = output
        .split('. ')
        .map((sentence) => <li className="text-bullet">{sentence}</li>);
      return <ul>{outputList}</ul>;
    } catch (err) {
      return <p></p>;
    }
  };

  return (
    <div>
      <Columns>
        <Columns.Column>
          <h1 className="text-header">Input</h1>
          <div className="input-box">
            <textarea
              class="textarea"
              placeholder="Input some text"
              rows="27"
              value={input}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
        </Columns.Column>
        <Columns.Column>
          <h1 className="text-header">Output</h1>
          <div className="output-box">
            <NotesOutput />
          </div>
        </Columns.Column>
      </Columns>
    </div>
  );
};

export default LiveTextOutput;
