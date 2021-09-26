import React from "react";
import Header from "./components/layouts/Header";
import Home from "./components/pages/Home";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./components/pages/Profile";
import Index from "./components/pages/Index";
export default function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Header />
          <Route exact path="/" component={Index}></Route>
          
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/profile" component={Profile}></Route>
        </div>
      </Switch>
    </Router>
  );
}
