import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AppLayout from './components/layout';
import './App.css';
import JsonFormatter from './pages/json-formatter';
import Minifycss from './pages/minify-css';
import Minifyjs from './pages/minify-js';
import Distance from './pages/distance';
import Currencies from './pages/currencies';
import Temperature from './pages/temperature';
import Weight from './pages/weight';
import Home from './pages/home';

const App = () => {
  return (
    <Router>   
      {/* <Redirect to="/"/> */}
      <Route path="/">
        <AppLayout exact path="/" component={Home}/>
      </Route>
      <Route path="/minify-css">
        <AppLayout exact path="/minify-css" component={Minifycss}/>
      </Route>
      <Route path="/minify-js">
        <AppLayout exact path="/minify-js" component={Minifyjs}/>
      </Route>
      <Route path="/json-formatter">
        <AppLayout exact path="/json-formatter" component={JsonFormatter}/>
      </Route>
      <Route path="/currencies">
        <AppLayout exact path="/currencies" component={Currencies}/>
      </Route>
      <Route path="/distance">
        <AppLayout exact path="/distance" component={Distance}/>
      </Route>
      <Route path="/temperature">
        <AppLayout exact path="/temperature" component={Temperature}/>
      </Route>
      <Route path="/weight">
        <AppLayout exact path="/weight" component={Weight}/>
      </Route>
    </Router>
  );
}

export default App;
