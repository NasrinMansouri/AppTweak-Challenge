import React, { FC, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelectors } from "./selectors";
import { login, setAccessToken } from "./slice";

type AuthInitializerProps = {
  children: ReactNode;
};

const AuthInitializer: FC<AuthInitializerProps> = ({ children }: AuthInitializerProps) => {
  const dispatch = useDispatch();
  const accessToken = useSelector(authSelectors.getAccessToken);

  const { location } = window;
  const regex = /.*access_token=(?<accesToken>[^&]*)/gi;
  const params = regex.exec(location.hash);

  useEffect(() => {
    if (!accessToken) {
      if (params && params[1]) {
        console.log("Access token found in URL params:", params[1]);
        dispatch(setAccessToken({ accessToken: params[1] }));
      } else {
        console.log("No access token found, redirecting to login.");
        dispatch(login());
      }
    }
  }, [accessToken, params]);

  return <>{children}</>;
};

export default AuthInitializer;
