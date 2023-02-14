import { CircularProgress, Typography } from "@mui/material";
import { Redirect, Route } from "react-router";
import { useAuth } from "../auth/auth";

export default function PrivateRoute({ children, ...rest }: any) {
  const auth = useAuth();

  let content = children;

  if (auth.loading) {
    content = (
      <>
        <Typography component="p">Authenticating...</Typography>
        <CircularProgress />
      </>
    );
  } else if (!auth.user) {
    content = <Redirect to={"/login"} />;
  }
  return <Route {...rest} render={() => content} />;
}
