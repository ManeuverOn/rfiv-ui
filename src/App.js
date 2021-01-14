import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { Landing } from "./components/landing";
import { Header } from "./components/header";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Landing} />
    </BrowserRouter>
  );
};
