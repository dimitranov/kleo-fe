import { IAuthResponseModel } from "../types/authTypes";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { AuthService } from "./authService";
import { API_BASE_PATH } from "./urlHelper";

export enum ReqType {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const privateAxios: AxiosInstance = axios.create({
  baseURL: API_BASE_PATH, // Set the base URL for all requests
});

privateAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const jwtToken = AuthService.getToken()?.tokens.access.token;

    if (jwtToken && config.headers) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

// Add an interceptor that will catch a 401 response
privateAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { response, config } = error;
    const prevRequest = config as AxiosRequestConfig & {
      _retry: boolean;
    };

    if (
      (response?.status === 401 || response?.status === 403) &&
      prevRequest?.headers &&
      !prevRequest?._retry
    ) {
      try {
        prevRequest._retry = true;
        const refreshResponse = await AuthService.sendRefresh();

        AuthService.saveToken(refreshResponse.data);

        prevRequest.headers[
          "Authorization"
        ] = `Bearer ${refreshResponse.data.tokens.access.token}`;

        return privateAxios(prevRequest);
      } catch (error) {
        throw error;
      }
    }
    return Promise.reject(error);
  }
);

const failterRequestAttempt = <T>(message: string): Promise<T> => {
  return Promise.reject(message);
};

export const request = <T>(
  method: ReqType,
  URL: string,
  data?: any
): Promise<T> => {
  switch (method) {
    case ReqType.GET:
      return privateAxios.get(URL);
    case ReqType.POST: {
      if (!data)
        return failterRequestAttempt<T>("No data in body - fix request");
      return privateAxios.post(URL, data);
    }
    case ReqType.PATCH: {
      if (!data)
        return failterRequestAttempt<T>("No data in body - fix request");
      return privateAxios.patch(URL, data);
    }
    case ReqType.DELETE:
      return privateAxios.delete(URL);
    default:
      return failterRequestAttempt<T>("Failed to use request properly");
  }
};
