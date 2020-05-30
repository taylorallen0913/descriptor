import React, { useState } from 'react';
import { Tabs } from 'react-bulma-components';
import Navbar from '../../components/Navbar';

import Youtube from '../../components/Youtube';
import Upload from '../../components/Upload';
import Text from '../../components/Text';

import './styles.css';

const Demo = () => {
  const [method, setMethod] = useState(1);
  return (
    <div className="demo">
      <Navbar type="about" />
      <h1 className="demo-header">Select method</h1>
      <Tabs
        type="toggle-rounded"
        align={'centered'}
        style={{ marginTop: '0.5%' }}
      >
        <Tabs.Tab active={method === 1} onClick={() => setMethod(1)}>
          Youtube
        </Tabs.Tab>
        <Tabs.Tab active={method === 2} onClick={() => setMethod(2)}>
          Upload
        </Tabs.Tab>
        <Tabs.Tab active={method === 3} onClick={() => setMethod(3)}>
          Text
        </Tabs.Tab>
      </Tabs>

      {method === 1 ? (
        <Youtube />
      ) : method === 2 ? (
        <Upload />
      ) : method === 3 ? (
        <Text />
      ) : null}
      <div style={{ marginBottom: '30%' }} />
    </div>
  );
};

export default Demo;
