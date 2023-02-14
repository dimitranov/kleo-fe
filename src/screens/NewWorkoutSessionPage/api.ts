import { AxiosResponse } from "axios";
import { ReqType, request } from "../../services/request";
import {
  API_ACTIONABLE_EXERCISES,
  API_WORKOUT_SESSIONS,
} from "../../services/urlHelper";
import {
  IActionableExercise,
  IActionableExerciseCreateRequest,
  IActionableExerciseUpdateRequest,
  IWorkoutSession,
  IWorkoutSessionRequest,
  IWorkoutSessionSearchRequest,
  IWorkoutSessionUpdateRequest,
  SimpleSet,
} from "./types";

type Result<T> = Promise<AxiosResponse<T>>;

type IWorkoutSessionCreationResponse = Omit<IWorkoutSession, "workout"> & {
  workout: string;
};

// WORKOUT SESSIONS
export const createWorkoutSession = async (
  body: IWorkoutSessionRequest
): Result<IWorkoutSessionCreationResponse> => {
  return request(ReqType.POST, API_WORKOUT_SESSIONS, body);
};

export const searchWorkoutSessions = async (
  query: IWorkoutSessionSearchRequest
): Result<IWorkoutSession[]> => {
  return request(
    ReqType.GET,
    `${API_WORKOUT_SESSIONS}?status=${query.status}&owner=${query.owner}`,
    false
  );
};
export const updateWorkoutSessions = async (
  id: string,
  body: Omit<IWorkoutSessionUpdateRequest, "id">
): Result<IWorkoutSession> => {
  return request(ReqType.PATCH, `${API_WORKOUT_SESSIONS}/${id}`, body);
};

export const getWorkoutSessionById = async (
  sessionId: string
): Result<IWorkoutSession> => {
  return request(ReqType.GET, `${API_WORKOUT_SESSIONS}/${sessionId}`, false);
};

// ACTIONABLE EXERCISES
export const createActionableExercise = async (
  body: IActionableExerciseCreateRequest
): Result<IActionableExercise> =>
  request(ReqType.POST, `${API_ACTIONABLE_EXERCISES}`, body);

export const updateActionableExercise = async (
  body: Partial<IActionableExerciseUpdateRequest>,
  actionableExerciseId: string
): Result<IActionableExercise> =>
  request(
    ReqType.PATCH,
    `${API_ACTIONABLE_EXERCISES}/${actionableExerciseId}`,
    body
  );

// SETS
export const saveSet = async (
  actionableExerciseId: string,
  set: SimpleSet
): Result<IActionableExercise> =>
  request(
    ReqType.POST,
    `${API_ACTIONABLE_EXERCISES}/${actionableExerciseId}/sets`,
    set
  );

export const updateSet = async (
  actionableExerciseId: string,
  changes: SimpleSet
): Result<IActionableExercise> =>
  request(
    ReqType.PATCH,
    `${API_ACTIONABLE_EXERCISES}/${actionableExerciseId}/sets/${changes._id}`,
    changes
  );

export const deleteSet = async (
  actionableExerciseId: string,
  setId: string
): Result<IActionableExercise> =>
  request(
    ReqType.DELETE,
    `${API_ACTIONABLE_EXERCISES}/${actionableExerciseId}/sets/${setId}`
  );
