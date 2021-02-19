import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Containers/Home";

const App = () => {
  <% if (router) { %>
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    )
  <% } else { %>
  return <Home />;
  <% } %>
};

export default App;
