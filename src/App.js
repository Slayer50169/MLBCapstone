import Nav from './Nav';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
  return (
    <div className="App bg-dark-subtle" data-bs-theme='dark'>
      <ParallaxProvider>
        <BrowserRouter>
          <Nav />
          <Routes />
        </BrowserRouter>
      </ParallaxProvider>

    </div>
  );
}

export default App;
