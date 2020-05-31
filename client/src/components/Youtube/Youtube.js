import React, { useState } from 'react';
import axios from 'axios';
import TextOutput from '../TextOutput';

import './styles.css';

const Youtube = () => {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const isLinkValid = () => (link.split('=')[1].length === 11 ? true : false);
  const onSubmitLink = async () => {
    if (isLinkValid()) {
      setLoading(true);
      const id = getLinkId();
      axios
        .post(`http://localhost:8000/transcribe/youtube/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      // Return error here
      console.log('error');
    }
  };

  const getLinkId = () => {
    return link.split('=')[1];
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
      {loading ? <h1>true</h1> : <h1>false</h1>}
      {loaded ? <TextOutput text="hello\nworld" /> : null}
    </div>
  );
};

export default Youtube;
