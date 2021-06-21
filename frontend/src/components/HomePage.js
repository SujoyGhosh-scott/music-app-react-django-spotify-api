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
import Room from "./Room";

function HomePage() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <h1>this is home page</h1>
        </Route>
        <Route path="/join" component={RoomJoinPage} />
        <Route path="/create" component={CreateRoomPage} />
        <Route path="/room/:roomCode" component={Room} />
      </Switch>
    </Router>
  );
}

export default HomePage;
