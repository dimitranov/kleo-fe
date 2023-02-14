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

export interface IExercise {
  name: string;
  muscle: EMuscles;
  intensity: EExerciseIntensity;
  description: string;
  _id?: string;
}
