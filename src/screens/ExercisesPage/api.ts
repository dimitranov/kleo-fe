import { AxiosResponse } from "axios";
import { request, ReqType } from "../../services/request";
import { API_EXERCISES } from "../../services/urlHelper";
import { IExercise } from "./types";

export const fetchAllExercises = async (): Promise<
  AxiosResponse<IExercise[]>
> => {
  return request(ReqType.GET, API_EXERCISES, false);
};
