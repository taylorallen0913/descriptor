import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar } from 'react-bulma-components';
import './styles.css';

const NavBar = () => {
  return (
    <Navbar fixed="top" transparent={true} style={{ marginTop: '0.7%' }}>
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#" className="nav-title">
          <Link to="/" style={{}}>
            Descriptor
          </Link>
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container className="nav-links">
          <Navbar.Item href="#">About</Navbar.Item>
          <div style={{ marginLeft: '30%' }} />
          <Navbar.Item href="#">About</Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default NavBar;
