import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "./../../app/store";
import * as api from "./api";
import {
  EWorkoutSessionStatus,
  IActionableExerciseCreateRequest,
  IActionableExerciseUpdateRequest,
  IWorkoutSession,
  IWorkoutSessionRequest,
  IWorkoutSessionSearchRequest,
  IWorkoutSessionUpdateRequest,
  SimpleSet,
} from "./types";

export interface WorkoutSessionState {
  workoutSession: IWorkoutSession | null;
  workoutSessionsSearchResults: IWorkoutSession[];
}

const initialState: WorkoutSessionState = {
  workoutSession: null,
  workoutSessionsSearchResults: [],
};

const refetchWorkoutSession = (
  dispatch: ThunkDispatch<any, any, AnyAction>,
  getState: () => unknown
) => {
  const state = getState() as RootState;
  console.log("refetchWorkoutSession store:", state);
  if (state.workoutSession?.workoutSession) {
    dispatch(
      getWorkoutSessionByIdThunk(state.workoutSession.workoutSession._id)
    );
  }
};

export const createWorkoutSessionThunk = createAsyncThunk(
  "workoutSession/create",
  async (body: IWorkoutSessionRequest, { dispatch }) => {
    const response = await api.createWorkoutSession(body);
    if (response.status > 200 && response.status < 300) {
      dispatch(getWorkoutSessionByIdThunk(response.data._id));
    }
  }
);

export const searchWorkoutSessionsThunk = createAsyncThunk(
  "workoutSession/search",
  async (
    query: IWorkoutSessionSearchRequest = {
      status: "",
      owner: "",
    }
  ) => {
    const response = await api.searchWorkoutSessions(query);
    return response.data;
  }
);

export const updateWorkoutSessionsThunk = createAsyncThunk(
  "workoutSession/update",
  async ({ data, id }: { data: IWorkoutSessionUpdateRequest; id: string }) => {
    const response = await api.updateWorkoutSessions(id, data);
    return response.data;
  }
);

export const getWorkoutSessionByIdThunk = createAsyncThunk(
  "workoutSession/getById",
  async (sessionId: string) => {
    const response = await api.getWorkoutSessionById(sessionId);
    return response.data;
  }
);

export const createActionableExerciseThunk = createAsyncThunk(
  "workoutSession/actionableExercise/create",
  async (
    {
      body,
    }: {
      body: IActionableExerciseCreateRequest;
    },
    { dispatch, getState }
  ) => {
    await api.createActionableExercise(body);
    // refetchWorkoutSession(dispatch, getState);
  }
);

export const updateActionableExerciseThunk = createAsyncThunk(
  "workoutSession//actionableExercise/update",
  async (
    {
      body,
      actionableExerciseId,
    }: {
      body: Partial<IActionableExerciseUpdateRequest>;
      actionableExerciseId: string;
    },
    { dispatch, getState }
  ) => {
    await api.updateActionableExercise(body, actionableExerciseId);
    // refetchWorkoutSession(dispatch, getState);
  }
);

export const saveSetThunk = createAsyncThunk(
  "workoutSession/actionableExercise/set/create",
  async (
    {
      actionableExerciseId,
      set,
    }: { actionableExerciseId: string; set: SimpleSet },
    { dispatch, getState }
  ) => {
    console.log(actionableExerciseId, set);
    const apiCall = set._id ? api.updateSet : api.saveSet;
    const response = await apiCall(actionableExerciseId, set);
    if (response.status >= 200 && response.status < 300) {
      refetchWorkoutSession(dispatch, getState);
    }
  }
);

export const deleteSetThunk = createAsyncThunk(
  "workoutSession/actionableExercise/set/delete",
  async (
    {
      actionableExerciseId,
      setId,
    }: { actionableExerciseId: string; setId: string },
    { dispatch, getState }
  ) => {
    console.log(actionableExerciseId, setId);
    const response = await api.deleteSet(actionableExerciseId, setId);
    if (response.status >= 200 && response.status < 300) {
      refetchWorkoutSession(dispatch, getState);
    }
  }
);

export const workoutSessionSlice = createSlice({
  name: "workoutSession",
  initialState,
  reducers: {
    clearLocalSession: (state: WorkoutSessionState) => {
      state.workoutSession = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getWorkoutSessionByIdThunk.fulfilled,
        (
          state: WorkoutSessionState,
          action: PayloadAction<IWorkoutSession>
        ) => {
          state.workoutSession = action.payload;
        }
      )
      .addCase(
        updateWorkoutSessionsThunk.fulfilled,
        (
          state: WorkoutSessionState,
          action: PayloadAction<IWorkoutSession>
        ) => {
          if (action.payload.status === EWorkoutSessionStatus.COMPLETED) {
            state.workoutSession = null;
          }

          if (action.payload.status === EWorkoutSessionStatus.ABANDONED) {
            state.workoutSession = null;
          }
        }
      )
      .addCase(
        searchWorkoutSessionsThunk.fulfilled,
        (state: WorkoutSessionState, action: PayloadAction<any>) => {
          const { results } = action.payload;
          state.workoutSessionsSearchResults = results;
          if (
            results.length === 1 &&
            results[0].status === EWorkoutSessionStatus.IN_PROGRES
          ) {
            state.workoutSession = results[0];
          }
        }
      );
  },
});

export const { clearLocalSession } = workoutSessionSlice.actions;

const selector = (state: RootState) => state.workoutSession;

export const makeWorkoutSessionSelector = createSelector(
  selector,
  (workoutSession) => workoutSession.workoutSession
);

export const makeWorkoutSessionSearchResultsSelector = createSelector(
  selector,
  (workoutSession) => workoutSession.workoutSessionsSearchResults
);

const selectorWorkoutSessionWorkout = (state: RootState) =>
  state.workoutSession.workoutSession?.workout;

export const makeWorkoutSessionExercisesSelector = createSelector(
  selectorWorkoutSessionWorkout,
  (workout) => (workout ? workout.exercises : [])
);

export default workoutSessionSlice.reducer;
