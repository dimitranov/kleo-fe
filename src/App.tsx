import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState, useRef } from "react";
import { Switch, useHistory } from "react-router-dom";
import "./App.scss";
import { mainRouteConfig } from "./routes/main";
import PersonIcon from "@mui/icons-material/Person";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import HomeIcon from "@mui/icons-material/Home";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { useAuth } from "./auth/auth";
import { AuthService } from "./services/authService";

const App: React.FC = () => {
  const auth = useAuth();

  const { push } = useHistory();

  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  const handleRefreshToken = async () => {
    try {
      const response = await AuthService.sendRefresh();
      auth.saveAuth(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Box sx={{ pb: 7 }} ref={ref}>
        <div className="content-wrapper">
          <Switch>
            {mainRouteConfig.map((rt) => (
              <rt.routeType exact key={rt.path} path={rt.path}>
                <rt.component />
              </rt.routeType>
            ))}
          </Switch>
        </div>

        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              switch (newValue) {
                case 0:
                  push("/");
                  break;
                case 1:
                  push("/new-workout-session");
                  break;
                case 2:
                  handleRefreshToken();
                  break;
              }
            }}
          >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction
              label="Workout"
              icon={<ControlPointIcon />}
            />
            <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
            <BottomNavigationAction
              label="Settings"
              icon={<SettingsApplicationsIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
};

/**
 *
 * App Idea
 *
 * App for viewing and booking housings
 *
 * Type of users:
 *  Base User:
 *    UnLogged:
 *      View accomodations,
 *      Filter & Search by Type, Destination, Price,
 *      View reviews,
 *      Reserve accomodations for days and view price.
 *      See for the booked timespan and in general.
 *    Logged:
 *      -same as unlogged user,
 *      Write a review and give a rate on a accomodation offer,
 *      -- eventualy pay and get an ID/coupon for proof of payment and reservation
 *  Accomodator:
 *    -- Everything the normal user can do.
 *    Add new accomodation,
 *    Setup discounts for given periods or diferent type of rooms.
 *
 * SCREENS:
 * Signup
 * Login
 * Dashboard - (Big search component and Top rated acomodations, recent searches, suggestions)
 * ResultsViewPage - (page with search results, List of acomodation, filters )
 * AcomodationInsightsPage - (Info for an acomodation, change dates, see prices, see rooms)
 * AddAcomodationPage - (create/edit acomodation form, add images and info, setup discounts for date ranges)
 *
 *
 *
 *
 *
 *
 *
 *
 */

export default App;
