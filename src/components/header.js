import logo from "../images/rfiv.svg";

import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const Header = () => {
  return (
    <Navbar>
      <Navbar.Brand href="#">
        <img
          alt="logo"
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        RFIV
      </Navbar.Brand>
      <Nav.Link>Search</Nav.Link>
      <Nav.Link>Add</Nav.Link>
      <Nav.Link>Update</Nav.Link>
    </Navbar>
  );
};
