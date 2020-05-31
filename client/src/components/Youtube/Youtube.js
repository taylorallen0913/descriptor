import React, { useState } from 'react';
import axios from 'axios';
import TextOutput from '../TextOutput';
import { Progress, Button } from 'react-bulma-components';
import getThumb from 'video-thumbnail-url';

import './styles.css';

const Youtube = () => {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [askCorrectVideo, setAskCorrectVideo] = useState(false);
  const [hiddenLink, setHiddenLink] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const [taskText, setTaskText] = useState('');
  const [taskNumber, setTaskNumber] = useState(0);
  const [output, setOutput] = useState();

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

  const onContinue = async () => {
    // TEST URL:
    // https://www.youtube.com/watch?v=3IVfdPYV3e0

    setThumbnail('');
    setAskCorrectVideo(false);
    setLoading(true);
    const id = hiddenLink.split('=')[1];

    // Download video
    setTaskText('Downloading video...');
    await axios
      .post('http://localhost:5000/api/youtube/download-video/', {
        id,
      })
      .catch((err) => console.log(err));

    setTaskText('Uploading video to GCP...');
    setTaskNumber(1);
    // Upload video
    await axios
      .post('http://localhost:5000/api/youtube/upload-video/', {
        bucket_name: 'descriptor',
        id,
      })
      .catch((err) => console.log(err));

    setTaskText('Transcribing video...');
    setTaskNumber(2);
    // Transcribe video
    await axios
      .post('http://localhost:5000/api/youtube/transcribe/', {
        id,
      })
      .then(async (res) => {
        // Format output
        setTaskText('Getting output...');
        await axios
          .post('http://localhost:5000/api/youtube/format/', {
            transcript: res.data,
            id,
          })
          .then((res) => setOutput(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    setLoading(false);
    setTaskText('');
  };

  return (
    <div>
      {output ? null : (
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
      )}
      <div style={{ marginBottom: '1.5%' }} />
      {loading ? (
        <div>
          <div className="tasks">
            <div>
              <h1 style={taskNumber === 0 ? { color: '#0077B6' } : null}>
                Download video
              </h1>
            </div>
            <div className="arrow-icon">
              <ion-icon size="small" name="arrow-forward-outline" />
            </div>
            <div>
              <h1 style={taskNumber === 1 ? { color: '#0077B6' } : null}>
                Upload video
              </h1>
            </div>
            <div className="arrow-icon">
              <ion-icon size="small" name="arrow-forward-outline" />
            </div>
            <div>
              <h1 style={taskNumber === 2 ? { color: '#0077B6' } : null}>
                Transcribe video
              </h1>
            </div>
          </div>
          <h1 className="task-text">{taskText}</h1>
          <Progress size="medium" style={{ width: '40%', marginLeft: '30%' }} />
        </div>
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
      {output ? <TextOutput output={output.notes} /> : null}
      <h1 className="youtube-error">{error}</h1>
    </div>
  );
};

export default Youtube;
