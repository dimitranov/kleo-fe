import { Redirect, Route, useLocation } from "react-router";
import { useAuth } from "../auth/auth";

export default function AuthRoute({ children, ...rest }: any) {
  let auth = useAuth();
  const location = useLocation<{ from: string }>();

  let content = children;
  if (auth.user)
    content = (
      <Redirect
        to={{
          pathname: (location.state && location.state.from) || "/",
        }}
      />
    );
  return <Route {...rest} render={() => content} />;
}
