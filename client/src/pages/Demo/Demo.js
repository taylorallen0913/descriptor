import React, { useState } from 'react';
import { Tabs } from 'react-bulma-components';
import Navbar from '../../components/Navbar';

import Youtube from '../../components/Youtube';
import LiveTextOutput from '../../components/LiveTextOutput';

import './styles.css';

const Demo = () => {
  const [method, setMethod] = useState(1);
  return (
    <>
      <Navbar type="about" />
      <div className="demo">
        <h1 className="demo-header">Select Input</h1>
        <Tabs
          type="toggle-rounded"
          align={'centered'}
          style={{ marginTop: '0.5%' }}
        >
          <Tabs.Tab active={method === 1} onClick={() => setMethod(1)}>
            Youtube
          </Tabs.Tab>
          <Tabs.Tab active={method === 2} onClick={() => setMethod(2)}>
            Text
          </Tabs.Tab>
        </Tabs>

        {method === 1 ? <Youtube /> : method === 2 ? <LiveTextOutput /> : null}
        <div style={{ marginBottom: '30%' }} />
      </div>
    </>
  );
};

export default Demo;
