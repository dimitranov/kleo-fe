import { IUser } from "../../types/authTypes";
import { UnitsOfMass } from "../../types/shared";

// WorkoutSession
export interface IWorkoutSession {
  name: string;
  workout: IWorkout;
  owner: string;
  status: EWorkoutSessionStatus;
  startTime: Date;
  endTime: Date;
  _id: string;
}

export interface IWorkoutSessionRequest {
  workout?: string;
  name: string;
  owner: string;
}

export interface IWorkoutSessionUpdateRequest {
  workout?: string;
  name?: string;
  status?: EWorkoutSessionStatus;
  owner?: string;
}

export interface IWorkoutSessionSearchRequest {
  owner: string;
  status: EWorkoutSessionStatus | "";
}

// Workout
export interface IWorkout {
  exercises: IActionableExercise[];
  creator?: Partial<IUser>;
  name: string;
  style?: EWorkoutStyles;
  level?: EWorkoutLevels;
  readOnly?: boolean;
  _id?: string;
}

// ActionableExercise
export interface IActionableExercise {
  exercise: IExercise;
  sets: SimpleSet[];
  units: UnitsOfMass;
  _id?: string;
}

export interface IActionableExerciseCreateRequest {
  exerciseId: string; // id
  workoutId: string; // id
}

export interface IActionableExerciseUpdateRequest {
  exerciseId: string; // id
  sets: SimpleSet[];
  units: UnitsOfMass;
}

// Exercise
export interface IExercise {
  name: string;
  muscle: EMuscles;
  intensity: EExerciseIntensity;
  description: string;
  _id?: string; // id
}

// Set
export enum SetType {
  WARMUP = "warmup",
  DROP = "drop",
  SUPER = "super",
  REGULAR = "regular",
}

export enum SetIntensity {
  VERY_EASY = "very_easy",
  EASY = "easy",
  MEDIUM = "medium",
  MEDIUM_HARD = "medium_hard",
  HARD = "hard",
  VERY_HARD = "very_hard",
}

export enum SetStatus {
  IN_PROGRESS = "in_progress",
  SAVED = "saved",
}

export interface SimpleSet {
  _id?: string;
  weight?: number;
  reps: number;
  type?: SetType;
  intensity?: SetIntensity;
  status: SetStatus; // used only  on the front end
}

// enums
export enum EWorkoutSessionStatus {
  IN_PROGRES = "in-progress",
  COMPLETED = "completed",
  PAUSES = "pauses",
  ABANDONED = "abandoned",
}
export enum EWorkoutStyles {
  FULL_BODY = "full_body",
  SPLIT = "split",
}

export enum EWorkoutLevels {
  BEGINNER = "beginner",
  INTERMEDIET = "intermediet",
  EXPERIENCED = "experienced",
  PRO = "pro",
}

export enum EMuscles {
  CHEST = "chest",
  LEGS = "legs",
  BACK = "back",
}

export enum EExerciseIntensity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
