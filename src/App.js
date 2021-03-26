import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Header } from "./components/header";
import { Landing } from "./components/landing";
import { Search } from "./components/search";
import { Add } from "./components/add";
import { Patient } from "./components/patient";
import { Edit } from "./components/edit";

export const App = () => {
  // loads the header bar and the component requested for according to the URL
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Landing} />
      <Route path="/search" component={Search} />
      <Route path="/add" component={Add} />
      <Route path="/patient/:id" component={Patient} />
      <Route path="/edit/:id" component={Edit} />
    </BrowserRouter>
  );
};
