import { Route } from "react-router";
import Dashboard from "../screens/DashboardPage";
import ExercisePage from "../screens/ExercisesPage";
import Login from "../screens/LoginPage";
import { NewWorkoutSessionPage } from "../screens/NewWorkoutSessionPage";
import Registration from "../screens/RegistrationPage";
import { SelectWorkoutSessionPage } from "../screens/SelectWorkoutSessionPage";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

interface PathDescriptor {
  path: string;
  component: React.FC;
  routeType: React.FC | typeof Route;
}

const PlaceHolder = () => <p>PLaceholder</p>;

export const mainRouteConfig: PathDescriptor[] = [
  {
    path: "/registration",
    component: Registration,
    routeType: AuthRoute,
  },
  {
    path: "/login",
    component: Login,
    routeType: AuthRoute,
  },
  {
    path: "/",
    component: Dashboard,
    routeType: Route,
  },
  {
    path: "/private",
    component: PlaceHolder,
    routeType: PrivateRoute,
  },
  {
    path: "/exercises",
    component: ExercisePage,
    routeType: Route,
  },
  {
    path: "/workouts",
    component: PlaceHolder,
    routeType: Route,
  },
  {
    path: "/workouts/:id",
    component: PlaceHolder,
    routeType: Route,
  },
  {
    path: "/my-workouts",
    component: PlaceHolder,
    routeType: Route,
  },
  {
    path: "/training-programs",
    component: PlaceHolder,
    routeType: Route,
  },
  {
    path: "/follow-workout/:id",
    component: PlaceHolder,
    routeType: PrivateRoute,
  },
  {
    path: "/select-workout-session",
    component: SelectWorkoutSessionPage,
    routeType: PrivateRoute,
  },
  {
    path: "/new-workout-session",
    component: NewWorkoutSessionPage,
    routeType: PrivateRoute,
  },
];
