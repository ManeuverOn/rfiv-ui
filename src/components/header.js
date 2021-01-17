import logo from "../images/rfiv.svg";

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Link className="logo-link" to="/">
        <img
          alt="logo"
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        RFIV
      </Link>
      <Link className="spaced-link" to="/search">
        Search
      </Link>
      <Link className="spaced-link" to="/add">
        Add
      </Link>
    </Navbar>
  );
};
