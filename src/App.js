import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Header } from "./components/header";
import { Landing } from "./components/landing";
import { Search } from "./components/search";
import { Add } from "./components/add";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Landing} />
      <Route path="/search" component={Search} />
      <Route path="/add" component={Add} />
    </BrowserRouter>
  );
};
