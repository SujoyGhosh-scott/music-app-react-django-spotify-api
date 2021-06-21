import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

function HomePage() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <h1>this is home page</h1>
        </Route>
        <Route path="/join" component={RoomJoinPage} />
        <Route path="/create" component={CreateRoomPage} />
      </Switch>
    </Router>
  );
}

export default HomePage;
