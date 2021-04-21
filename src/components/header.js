import logo from "../images/rfiv.svg";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

export const Header = () => {
  // return header bar with navigation links
  const location = useLocation();
  return (
    <Navbar bg="dark" variant="dark">
      <Link className="logo-link" to="/" replace={location.pathname === "/"}>
        <img
          alt="logo"
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        RFIV
      </Link>
      <Link
        className="spaced-link"
        to="/search"
        replace={location.pathname === "/search"}
      >
        Search
      </Link>
      <Link
        className="spaced-link"
        to="/add"
        replace={location.pathname === "/add"}
      >
        Add
      </Link>
    </Navbar>
  );
};
