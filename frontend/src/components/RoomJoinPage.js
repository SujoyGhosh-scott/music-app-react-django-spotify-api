import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

function RoomJoinPage({ history }) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const joinRoom = () => {
    console.log("joining room");
    console.log(roomCode);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((res) => {
        if (res.ok) {
          history.push(`/room/${roomCode}`);
          setRoomCode("");
        } else {
          setError("Room not found");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid container spacing={1} className={"page"}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={error}
          color="secondary"
          label="Code"
          onChange={(e) => setRoomCode(e.target.value)}
          value={roomCode}
          helperText={error}
          placeholder="Enter a Room Code"
          variant="outlined"
        />
      </Grid>
      <Grid container justify="space-around" style={{ height: 50 }}>
        <Button color="secondary" component={Link} to="/">
          Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => joinRoom()}
        >
          Enter Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default RoomJoinPage;
