import logo from "../images/rfiv.svg";

import React from "react";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar>
      <Link to="/">
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
      </Link>
      <Link className="spaced-link" to="/search">Search</Link>
      <Link className="spaced-link" to="/add">Add</Link>
      <Link className="spaced-link" to="/update">Update</Link>
    </Navbar>
  );
};
