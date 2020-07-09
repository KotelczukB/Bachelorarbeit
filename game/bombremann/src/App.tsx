import React from 'react';
import './App.scss';
import { Game } from './components/Game/Game';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

function App() {
  return (
    <div className="app">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/game" component={Game} />
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;
