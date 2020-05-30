import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bulma-components';
import './styles.css';

const NavBar = (props) => {
  return (
    <Navbar transparent={true} style={{ backgroundColor: 'transparent' }}>
      <Navbar.Menu>
        <Navbar.Item className="nav-title">
          <Link to="/" style={{ color: '#F1F1F1', marginTop: '5%' }}>
            Descriptor
          </Link>
        </Navbar.Item>
        <Navbar.Container className="nav-links">
          <div style={{ marginLeft: '80%' }} />
          <Navbar.Item style={{ marginTop: '5%' }}>
            <Link to="/demo" style={{ color: '#DCDCDC' }}>
              Try it out
            </Link>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default NavBar;
