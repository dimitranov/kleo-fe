// export const API_BASE_PATH = "http://127.0.0.1:4000/v1";
export const API_BASE_PATH = "http://192.168.0.58:4000/v1";

export const API_BASE_PATH_USERS = "/users";

export const API_BASE_PATH_AUTH = "/auth";

export const API_SIGNUP_PATH = API_BASE_PATH_AUTH + "/register";
export const API_SIGNIN_PATH = API_BASE_PATH_AUTH + "/login";
export const API_REFRESH_PATH = API_BASE_PATH_AUTH + "/refresh-tokens";

export const API_TOURS = "/tours";

export const API_EXERCISES = "/exercises";
export const API_WORKOUT_SESSIONS = "/workout-sessions";
export const API_WORKOUT_SESSIONS_EXISTING_USER_SESSION =
  API_WORKOUT_SESSIONS + "/check-for-existing-user-session";

export const API_ACTIONABLE_EXERCISES = "/actionable-exercises";
