import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {
    Link
  } from "react-router-dom";

const NavBar = () => {
    return(
        <div className="App">
    <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="danger" variant="dark">
  <ReactBootStrap.Navbar.Brand href="#home">THICC BOIS HOURS</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto"> 
    <Link to="/Home">
    <ReactBootStrap.Nav.Link href="#Home">Home</ReactBootStrap.Nav.Link>
    </Link>
    <Link to="/About">
    <ReactBootStrap.Nav.Link href="#About">About</ReactBootStrap.Nav.Link>
    </Link>
    

    
   
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
        </div>
    )
}

export default NavBar;