import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { StartSessionButton } from "../../components/StartSessionButton";

export const SelectWorkoutSessionPage = () => {
  return (
    <div>
      <Typography variant="h5" textAlign="center">
        Select a workout session
      </Typography>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button variant="outlined">Chest - Shouldres - Biceps</Button>
      <Button variant="outlined">Back - traps</Button>
      <Button variant="outlined">fdslk fsd</Button>
      <Button variant="outlined">g sdlkjgls </Button>
      <StartSessionButton asLink to="/new-workout-session" title="Start New" />
    </div>
  );
};
