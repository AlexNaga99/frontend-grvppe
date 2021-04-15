import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppLayout from './components/layout';
import './App.css';
import JsonFormatter from './pages/json-formatter';
import Minifycss from './pages/minify-css';
import Minifyjs from './pages/minify-js';
import Distance from './pages/distance';
import Currencies from './pages/currencies';
import Temperature from './pages/temperature';
import Weight from './pages/weight';
import Imc from './pages/imc';
import Home from './pages/home';
import NotFound from './pages/not-found';

const App = () => {
  return (
    <Router>   
      <Switch>
          <AppLayout exact path="/" component={Home}/>
          <AppLayout exact path="/minify-css" component={Minifycss}/>
          <AppLayout exact path="/minify-js" component={Minifyjs}/>
          <AppLayout exact path="/json-formatter" component={JsonFormatter}/>
          <AppLayout exact path="/currencies" component={Currencies}/>
          <AppLayout exact path="/distance" component={Distance}/>
          <AppLayout exact path="/temperature" component={Temperature}/>
          <AppLayout exact path="/weight" component={Weight}/>
          <AppLayout exact path="/imc" component={Imc}/>
          <AppLayout component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
