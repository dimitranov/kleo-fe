import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import exerciseReducer from "../screens/ExercisesPage/slice";
import workoutReducer from "../screens/NewWorkoutSessionPage/slice";
import { requestReducer } from "./requests";

export const store = configureStore({
  reducer: {
    // loading
    request: requestReducer,
    // features
    exercises: exerciseReducer,
    workoutSession: workoutReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
