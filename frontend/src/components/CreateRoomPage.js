import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function CreateRoomPage({ history }) {
  const [guest_can_pause, setGCP] = useState(true);
  const [votes_to_skip, setVTS] = useState(2);

  const handleVotes = (e) => {
    //setVTS(parseInt(e.target.value));
    setVTS(e.target.value);
  };

  const handlRadioChange = (e) => {
    setGCP(e.target.value === "true" ? true : false);
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

  return (
    <Grid container spacing={1} className={"page"}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4" gutterBottom>
          Create a Room
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
        <RadioGroup row defaultValue="true" onChange={handlRadioChange}>
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
            defaultValue={1}
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
      </Grid>
    </Grid>
  );
}

export default CreateRoomPage;
