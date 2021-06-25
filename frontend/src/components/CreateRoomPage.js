import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Snackbar from "@material-ui/core/Snackbar";
//import MuiAlert from "@material-ui/lab/Alert";

{
  /**
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} */
}

function CreateRoomPage({
  guest_can_pause,
  votes_to_skip,
  setGuestCanPause,
  setVotesToSkip,
  update,
  roomCode,
  updateCallback = () => {},
}) {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = useState(null);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleVotes = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handlRadioChange = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  const createRoom = () => {
    console.log("creating room");
    console.log(guest_can_pause, votes_to_skip);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_pause,
        votes_to_skip,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((res) => res.json())
      .then((data) => history.push("/room/" + data.code));
  };

  const updateRoom = () => {
    console.log("updating room");
    console.log(guest_can_pause, votes_to_skip, roomCode);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_can_pause: guest_can_pause,
        votes_to_skip: votes_to_skip,
        code: roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions)
      .then((res) => {
        if (res.ok) {
          console.log("update was ok", res);
          setMessage("Room Updated Successfully.");
          handleClick();
        } else {
          console.log("update was not ok", res);
          setMessage("Error. Please try again");
          handleClick();
        }
      })
      .catch((err) => console.log("error: ", err));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4" gutterBottom>
          {update ? "Update Room" : "Create a Room"}
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="column"
        justify="center"
        xs={12}
        alignItems="center"
      >
        <FormHelperText>
          <div align="center">Guest Control of Playback State</div>
        </FormHelperText>
        <RadioGroup
          row
          value={guest_can_pause ? "true" : "false"}
          onChange={handlRadioChange}
        >
          <FormControlLabel
            value="true"
            control={<Radio color="secondary" />}
            label="Play/Pause"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="false"
            control={<Radio color="secondary" />}
            label="No Control"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            value={votes_to_skip}
            onChange={handleVotes}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid container justify="space-around" style={{ height: 50 }}>
        {!update ? (
          <>
            <Button color="secondary" to="/" component={Link}>
              back
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => createRoom()}
            >
              Create A Room
            </Button>
          </>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            onClick={() => updateRoom()}
          >
            Update Room
          </Button>
        )}
      </Grid>
      {/**
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar> */}
    </Grid>
  );
}

export default CreateRoomPage;
