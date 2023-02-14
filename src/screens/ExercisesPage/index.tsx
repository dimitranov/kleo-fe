import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { useRequestState } from "../../app/requests";
import ExerciseCart from "./components/ExerciseCard";
import { fetchAllExercisesThunk, makeExercisesSelector } from "./slice";

export default function ExercisePage() {
  const dispatch = useAppDispatch();
  const exercises = useSelector(makeExercisesSelector);
  const exercisesLoading = useRequestState(fetchAllExercisesThunk);

  useEffect(() => {
    // if (exercises.length === 0) {
    dispatch(fetchAllExercisesThunk());
    // }
  }, [dispatch]);

  if (exercisesLoading.pending) return <p>Loading...</p>;
  if (exercisesLoading.rejected) return <p>ERROR!!!</p>;

  return (
    <>
      <Typography variant="h4" color="text.secondary" marginY={3}>
        Exercises
      </Typography>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {exercises.map((ex) => (
          <Grid item xs={6} key={ex.name}>
            <ExerciseCart exercise={ex} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
