import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { useRequestState } from "../app/requests";
import {
  makeExercisesSelector,
  fetchAllExercisesThunk,
} from "../screens/ExercisesPage/slice";
import { IExercise } from "../screens/ExercisesPage/types";

interface ExerciseRenderedProps {
  render: (exercises: IExercise) => React.ReactNode;
}

export default function ExerciseRenderer({ render }: ExerciseRenderedProps) {
  const dispatch = useAppDispatch();
  const exercises = useSelector(makeExercisesSelector);
  const exercisesLoading = useRequestState(fetchAllExercisesThunk);

  useEffect(() => {
    dispatch(fetchAllExercisesThunk());
  }, [dispatch]);

  if (exercisesLoading.pending) return <p>Exercise loading...</p>;
  if (exercisesLoading.rejected) return <p>Something went wrong!</p>;

  return <>{exercises.map((ex) => render(ex))}</>;
}
