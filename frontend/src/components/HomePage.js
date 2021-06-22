import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";

import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

const Home = () => {
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item align="center">
        <Typography variant="h3" component="h3">
          House Party
        </Typography>
      </Grid>
      <Grid item align="center">
        <ButtonGroup disableElevation variant="contained" color="secondary">
          <Button color="secondary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    fetch("/api/user-in-room")
      .then((res) => res.json())
      .then((data) => setRoomCode(data.code));
  }, []);

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={() => {
            return roomCode ? <Redirect to={`/room/${roomCode}`} /> : <Home />;
          }}
        />
        <Route path="/join" component={RoomJoinPage} />
        <Route path="/create" component={CreateRoomPage} />
        <Route path="/room/:roomCode">
          <Room clearRoomCode={clearRoomCode} />
        </Route>
      </Switch>
    </Router>
  );
}

export default HomePage;
