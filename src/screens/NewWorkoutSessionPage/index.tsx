import { Alert, Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useRequestState } from "../../app/requests";
import { useAuth } from "../../auth/auth";
import CircularIndeterminate from "../../components/Loader";
import ExerciseBlock from "./components/ExerciseBlock";
import { ExerciseSelector } from "./components/ExerciseSelector";
import {
  updateWorkoutSessionsThunk,
  makeWorkoutSessionSelector,
  createWorkoutSessionThunk,
  searchWorkoutSessionsThunk,
  clearLocalSession,
  makeWorkoutSessionExercisesSelector,
} from "./slice";
import { EWorkoutSessionStatus, IActionableExercise } from "./types";

export const NewWorkoutSessionPage = () => {
  const history = useHistory();

  const { user } = useAuth();

  const dispatch = useAppDispatch();

  const [showContinueAlert, setShowContinueAlert] = useState(false);
  const [didFetchForExisting, setDidFetchForExisting] = useState(false);
  const [addNewExerciseForm, setAddNewExerciseForm] = useState(false);

  const workoutSession = useSelector(makeWorkoutSessionSelector);
  const workoutSessionExercises = useSelector(
    makeWorkoutSessionExercisesSelector
  );

  const activeSessionRequest = useRequestState(searchWorkoutSessionsThunk);
  const updateSessionRequest = useRequestState(updateWorkoutSessionsThunk);
  const sessionRequest = useRequestState(createWorkoutSessionThunk);

  const sessionExists = useMemo(
    () => workoutSession && Object.keys(workoutSession).length > 0,
    [workoutSession]
  );

  useEffect(() => {
    if (user && !sessionExists) {
      // search for session from the current user that are active
      dispatch(
        searchWorkoutSessionsThunk({
          owner: user.user.id,
          status: EWorkoutSessionStatus.IN_PROGRES,
        })
      );
      setDidFetchForExisting(true);
    }
  }, [dispatch, user, sessionExists]);

  useEffect(() => {
    setShowContinueAlert(
      Boolean(
        didFetchForExisting &&
          activeSessionRequest.fulfilled &&
          workoutSession &&
          !sessionRequest.fulfilled
      )
    );
  }, [
    activeSessionRequest,
    didFetchForExisting,
    workoutSession,
    sessionRequest,
  ]);

  useEffect(() => {
    return () => {
      dispatch(clearLocalSession());
    };
  }, [dispatch]);

  useEffect(() => {
    if (updateSessionRequest.fulfilled) {
      history.push("/");
    }
  }, [updateSessionRequest, history]);

  const updateWorkoutStatus = (status: EWorkoutSessionStatus) => {
    if (workoutSession) {
      dispatch(
        updateWorkoutSessionsThunk({
          id: workoutSession._id,
          data: {
            status,
          },
        })
      );
    }
  };

  const handleFinishSession = () => {
    updateWorkoutStatus(EWorkoutSessionStatus.COMPLETED);
  };

  const handleAbandonSession = () => {
    updateWorkoutStatus(EWorkoutSessionStatus.ABANDONED);
  };

  const handlePauseSession = () => {
    updateWorkoutStatus(EWorkoutSessionStatus.PAUSES);
  };

  const handleStartSession = () => {
    if (user) {
      dispatch(
        createWorkoutSessionThunk({
          owner: user.user.id,
          name: "fuasgfhalksjfla WOKROUT SESSION 1234",
        })
      );
    }
  };

  const renderRecordedExercises = () => {
    if (
      !workoutSession ||
      typeof workoutSession.workout === "string" ||
      workoutSessionExercises.length === 0
    )
      return null;

    return workoutSessionExercises.map(
      (ex: IActionableExercise, index: number) => (
        <ExerciseBlock exercise={ex} key={ex._id} exerciseIndex={index} />
      )
    );
  };

  const loading =
    activeSessionRequest.pending || sessionRequest.pending || !user;

  return (
    <div>
      {loading && <CircularIndeterminate />}
      {!loading && (
        <>
          {!sessionExists && (
            <Box display="flex" justifyContent="center">
              <Button
                variant="outlined"
                size="large"
                onClick={handleStartSession}
              >
                Start
              </Button>
            </Box>
          )}
          {sessionExists && (
            <>
              {showContinueAlert && (
                <Alert
                  severity="success"
                  color="info"
                  onClose={() => {
                    setShowContinueAlert(false);
                  }}
                >
                  Continue last session !
                </Alert>
              )}
              <h3>Workout session ID: {workoutSession?._id}</h3>

              {renderRecordedExercises()}

              <ExerciseSelector
                open={addNewExerciseForm}
                onClose={() => setAddNewExerciseForm(false)}
                workoutId={workoutSession?.workout._id}
                workoutSessionId={workoutSession?._id}
              />
              <Divider />
              <Box display="flex" justifyContent="center" marginY="20px">
                <Button
                  variant="text"
                  onClick={() => setAddNewExerciseForm(true)}
                >
                  Add exercise
                </Button>
              </Box>
              <Divider />
              <Box
                display="flex"
                justifyContent="space-between"
                marginTop="20px"
              >
                <Button
                  style={{ width: "100px" }}
                  variant="text"
                  color="secondary"
                  onClick={handleAbandonSession}
                >
                  Abandon
                </Button>
                <Button
                  style={{ width: "100px" }}
                  size="large"
                  variant="text"
                  color="primary"
                  onClick={handleFinishSession}
                >
                  Finish
                </Button>
                <Button
                  style={{ width: "100px" }}
                  variant="text"
                  color="secondary"
                  onClick={handlePauseSession}
                >
                  Pause
                </Button>
              </Box>
            </>
          )}
        </>
      )}
    </div>
  );
};
