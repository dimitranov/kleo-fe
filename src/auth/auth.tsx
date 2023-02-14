import { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../services/authService";
import { IAuthResponseModel } from "../types/authTypes";

export enum UserRole {
  USER = "user",
  PIZZAR = "pizzar",
  ADMIN = "admin",
  NONE = "none",
}

export interface IAuthContext {
  user: IAuthResponseModel | null;
  loading: boolean;
  saveAuth: (userdata: IAuthResponseModel | null) => void;
  removeAuth: () => void;
  userRole: UserRole;
}

const authInitialValue: IAuthContext = {
  user: null,
  loading: true,
  saveAuth: (userData: IAuthResponseModel | null) => {},
  removeAuth: () => {},
  userRole: UserRole.NONE,
};

export const AuthContext = createContext<IAuthContext>(authInitialValue);

export const useAuth = () => {
  return useContext<IAuthContext>(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IAuthResponseModel | null>(null);
  const [loading, setIsLoading] = useState<boolean>(authInitialValue.loading);

  useEffect(() => {
    const storedToken = AuthService.getToken();
    if (storedToken) {
      setUser(storedToken);
      setIsLoading(false);
    }
  }, []);

  const saveAuth = (userData: IAuthResponseModel | null) => {
    AuthService.saveToken(userData as IAuthResponseModel);
    setUser(userData);
    setIsLoading(false);
  };

  const removeAuth = () => {
    AuthService.deleteToken();
    setUser(null);
  };

  const userRole = !user
    ? UserRole.NONE
    : ((user as IAuthResponseModel).user.role as UserRole);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        saveAuth,
        removeAuth,
        userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const PrivateLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const user = useAuth();
  if (user.user) return <Link to={to}>{children}</Link>;
  return null;
};

export const getUserRole = (auth: IAuthContext): UserRole => {
  if (!auth.user) return UserRole.NONE;
  return ((auth as IAuthContext).user as IAuthResponseModel).user
    .role as UserRole;
};
