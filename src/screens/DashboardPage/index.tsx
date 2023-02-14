import { Box, ButtonGroup, Button } from "@mui/material";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../auth/auth";
import { StartSessionButton } from "../../components/StartSessionButton";

export default function Dashboard() {
  const auth = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    auth.removeAuth();
    history.push("/");
  };

  return (
    <div>
      Dashobard
      <Box justifyContent="center" display="flex" marginY={3}>
        {auth.user ? (
          <>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button component={Link} to="/workouts">
                Workouts
              </Button>
              <Button component={Link} to="/training-programs">
                Programs
              </Button>
              <Button component={Link} to="/exercises">
                Exercises
              </Button>
            </ButtonGroup>
            <br />
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant="contained" component={Link} to="/login">
            Login
          </Button>
        )}
      </Box>
      <br />
      <StartSessionButton
        asLink
        to="/select-workout-session"
        title="Start Session"
      />
    </div>
  );
}
