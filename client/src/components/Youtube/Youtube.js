import React, { useState } from 'react';
import axios from 'axios';
import TextOutput from '../TextOutput';
import { Progress, Button } from 'react-bulma-components';
import getThumb from 'video-thumbnail-url';

import './styles.css';

const Youtube = () => {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [outputLoaded, setOutputLoaded] = useState(false);
  const [output, setOutput] = useState();
  const [error, setError] = useState();
  const [askCorrectVideo, setAskCorrectVideo] = useState(false);
  const [hiddenLink, setHiddenLink] = useState('');

  const [thumbnail, setThumbnail] = useState('');

  const isLinkValid = () => {
    let length = -1;
    try {
      length = link.split('=')[1].length;
    } catch (err) {}
    return length === 11;
  };

  const onSubmitLink = async () => {
    if (isLinkValid()) {
      setError('');
      setHiddenLink(link);
      setLink('');

      setAskCorrectVideo(true);

      const thumbnailURL = await getThumb(link);
      setThumbnail(thumbnailURL);
    } else {
      // Return error here
      setError('Please input a valid link.');
      console.log('error');
    }
  };

  const onContinue = () => {
    setThumbnail('');
    setAskCorrectVideo(false);
    setLoading(true);
    const id = hiddenLink.split('=')[1];
    axios
      .post(`http://localhost:8000/transcribe/youtube/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
      <div style={{ marginBottom: '1.5%' }} />
      {loading ? (
        <Progress size="small" style={{ width: '40%', marginLeft: '30%' }} />
      ) : null}
      {thumbnail ? <img src={thumbnail} className="center" /> : null}
      {askCorrectVideo ? (
        <Button
          color="info"
          className="continue-button"
          onClick={() => onContinue()}
        >
          Continue
        </Button>
      ) : null}
      {outputLoaded ? <TextOutput text="hello\nworld" /> : null}
      <h1 className="youtube-error">{error}</h1>
    </div>
  );
};

export default Youtube;
