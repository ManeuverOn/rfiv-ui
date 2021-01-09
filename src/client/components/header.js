import logo from "../images/rfiv.svg";

import React from "react";

export const Header = () => {
  return (
    <img
      alt="logo"
      src={logo}
      width="40"
      height="40"
      className="d-inline-block align-top"
    />
  );
};
