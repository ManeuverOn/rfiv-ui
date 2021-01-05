'use strict';

import React, { useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Landing from './components/landing';

const App = () => {
  
  return (
    <BrowserRouter>
        <Route exact path='/' component={Landing} />
    </BrowserRouter>
  );
};

export default App;
