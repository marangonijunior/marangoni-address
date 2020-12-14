import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../components/Home";

const RouterProvider = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
};

export default RouterProvider;
