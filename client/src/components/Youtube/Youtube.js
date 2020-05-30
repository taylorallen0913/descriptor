import React from 'react';

import './styles.css';
const Youtube = () => {
  return (
    <div>
      <form className="youtube-form">
        <h1 className="youtube-link">Enter Youtube Link</h1>
        <input
          type="text"
          id="lname"
          name="lastname"
          placeholder="Youtube Link"
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Youtube;
