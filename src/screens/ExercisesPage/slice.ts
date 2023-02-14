import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchAllExercises } from "./api";
import { IExercise } from "./types";

export interface ExercisesState {
  exercises: IExercise[];
}

const initialState: ExercisesState = {
  exercises: [],
};

export const fetchAllExercisesThunk = createAsyncThunk(
  "exercises/getAll",
  async () => {
    const response: any = await fetchAllExercises();
    return response.data.results;
  }
);

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllExercisesThunk.fulfilled, (state, action) => {
      state.exercises = action.payload;
    });
  },
});

export const makeExercisesSelector = (state: RootState) =>
  state.exercises.exercises;

export default exercisesSlice.reducer;
