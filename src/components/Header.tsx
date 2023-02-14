import React, { Fragment } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../auth/auth";

export default function Header() {
  const auth = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    auth.removeAuth();
    history.push("/");
  };

  return (
    <AppBar position="static">
      <div className="content-wrapper">
        <Toolbar
          sx={{
            "& .MuiSvgIcon-root": {
              transform: "scale(1.3)",
            },
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <DirectionsRunIcon fontSize="medium" />
          </IconButton>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
              userSelect: "none",
            }}
          >
            Kleo
          </Typography>
          {!auth.user && (
            <Fragment>
              <Button component={Link} to={"/registration"} color="inherit">
                Register
              </Button>
              <Button component={Link} to={"/login"} color="inherit">
                Login
              </Button>
            </Fragment>
          )}
          {auth.user && (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </div>
    </AppBar>
  );
}
