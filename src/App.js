import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import Home from './components/Home';
import StarWars from './components/StarWars';


function App() {
  return (
    <div className="App">
      <Home />
      <StarWars />
    </div>
  );
}

export default App;
