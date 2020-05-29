import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bulma-components';
import './styles.css';

const NavBar = () => {
  return (
    <Navbar transparent={true} style={{ backgroundColor: 'transparent' }}>
      <Navbar.Menu>
        <Navbar.Item className="nav-title">
          <Link to="/" style={{ color: '#F1F1F1', marginTop: '5%' }}>
            Descriptor
          </Link>
        </Navbar.Item>
        <Navbar.Container className="nav-links">
          <Navbar.Item style={{ color: '#DCDCDC', marginTop: '5%' }}>
            About
          </Navbar.Item>
          <div style={{ marginLeft: '30%' }} />
          <Navbar.Item style={{ color: '#DCDCDC', marginTop: '5%' }}>
            Try it out
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default NavBar;
