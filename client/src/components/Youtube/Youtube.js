import React, { useState } from 'react';
import TextOutput from '../TextOutput';
import axios from 'axios';

import './styles.css';

const Youtube = () => {
  const [link, setLink] = useState('');
  const [processing, setProcessing] = useState(false);

  const onSubmitLink = () => {
    if (validateLink()) {
      const id = getLinkId();
    } else {
      // Return error here
    }
  };

  const getLinkId = () => {
    return link.split('=')[1];
  };

  const validateLink = (id) => {
    return link.split('=')[1].length === 11;
  };

  return (
    <div>
      <div className="youtube-form">
        <h1 className="youtube-link">Enter Youtube Link</h1>
        <input
          type="text"
          id="link-input"
          placeholder="Youtube Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button onClick={() => onSubmitLink()}>Submit</button>
      </div>
      <div style={{ marginBottom: '2%' }} />
      {processing ? <TextOutput text="hello\nworld" /> : null}
    </div>
  );
};

export default Youtube;
