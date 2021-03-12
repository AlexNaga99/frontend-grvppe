import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AppLayout from './components/layout';
import './App.css';
import ConvertImage from './pages/convert-image';
import ConvertVideo from './pages/convert-video';
import ConvertDocument from './pages/convert-documents';
import Distance from './pages/distance';
import Currencies from './pages/currencies';
import Temperature from './pages/temperature';
import Weight from './pages/weight';
import Home from './pages/home';

const App = () => {
  return (
    <Router>   
      <Redirect to="/"/>
      <Route path="/">
        <AppLayout exact path="/" component={Home}/>
      </Route>
      <Route path="/convert-image">
        <AppLayout exact path="/convert-image" component={ConvertImage}/>
      </Route>
      <Route path="/convert-videos">
        <AppLayout exact path="/convert-videos" component={ConvertVideo}/>
      </Route>
      <Route path="/convert-documents">
        <AppLayout exact path="/convert-documents" component={ConvertDocument}/>
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
