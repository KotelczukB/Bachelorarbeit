import React from 'react';
import './App.css';
import { Auth } from './components/Auth/Auth';
import { Game } from './components/Game/Game';

function App() {
  return (
     <Auth/> ?? <Game/>
  );
}

export default App;
