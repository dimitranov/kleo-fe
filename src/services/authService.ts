import { AxiosResponse } from "axios";
import {
  IAuthResponseModel,
  ILoginCredentials,
  IRegistrationCredentials,
} from "../types/authTypes";
import { request, ReqType } from "./request";
import {
  API_SIGNUP_PATH,
  API_SIGNIN_PATH,
  API_REFRESH_PATH,
} from "./urlHelper";

export class AuthService {
  private static sanitizeSignInData(data: ILoginCredentials) {
    return {
      email: data.email,
      password: data.password,
    };
  }

  private static sanitizeSignUpData(data: IRegistrationCredentials) {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
    };
  }

  //send the registration data via axios to the node server and recive the token returned or the error message
  public static register(data: IRegistrationCredentials): Promise<any> {
    return request(
      ReqType.POST,
      API_SIGNUP_PATH,
      AuthService.sanitizeSignUpData(data)
    );
  }

  // send the login data to the server and handle the token or  errors
  public static login(data: ILoginCredentials): Promise<any> {
    return request(
      ReqType.POST,
      API_SIGNIN_PATH,
      AuthService.sanitizeSignInData(data)
    );
  }

  public static saveToken(data: IAuthResponseModel) {
    console.log(
      "Saved Access:",
      data.tokens.access.token.substr(data.tokens.access.token.length - 5),
      "Saved Refresh:",
      data.tokens.refresh.token.substr(data.tokens.refresh.token.length - 5)
    );
    sessionStorage.setItem("kleoAuth", JSON.stringify(data));
  }

  public static getToken(): IAuthResponseModel | null {
    const data = sessionStorage.getItem("kleoAuth");
    if (data) {
      const xxx = JSON.parse(data) as IAuthResponseModel;
      console.log(
        "Retrieved Access:",
        xxx.tokens.access.token.substr(xxx.tokens.access.token.length - 5),
        "Retrieved Refresh:",
        xxx.tokens.refresh.token.substr(xxx.tokens.refresh.token.length - 5)
      );
      return xxx;
    }
    return null;
  }

  // make it so that when we recieve and 401 error we send a reqfresh token and then recieve the new JWT and the new refresh token
  public static sendRefresh(): Promise<AxiosResponse<IAuthResponseModel>> {
    return request(ReqType.POST, API_REFRESH_PATH, {
      refreshToken: AuthService.getToken()?.tokens.refresh.token,
    });
  }

  public static deleteToken() {
    sessionStorage.removeItem("kleoAuth");
  }
}
