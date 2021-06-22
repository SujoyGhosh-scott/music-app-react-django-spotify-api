import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Room({ clearRoomCode }) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  const history = useHistory();
  const { roomCode } = useParams();
  console.log("room code: ", roomCode);

  useEffect(() => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((res) => {
        if (!res.ok) {
          console.log("room code not ok");
          clearRoomCode();
          history.push("/");
        }
        console.log("room code ok");
        return res.json();
      })
      .then((data) => {
        console.log("data: ", data);
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
      });
  }, []);

  const leaveRoom = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_res) => {
      clearRoomCode();
      history.push("/");
    });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest can pause: {guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => leaveRoom()}
        >
          Leave room
        </Button>
      </Grid>
    </Grid>
  );
}

export default Room;
