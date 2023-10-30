import logo from './logo.svg';
import Player from './Player';
import Home from './Home'
import Teams from './Teams';
import Team from './Team'
import Games from './Games';
import Nav from './Nav';
import ButtonUsage from './SearchBar';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import React from 'react';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@mui/material';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/games' element={<Games />} />
            <Route path='/player/:id' element={<Player />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/team/:id' element={<Team />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>

    </div>
  );
}

export default App;
