import { FC, ReactElement } from "react";
import useLocalStorage from "use-local-storage";
import { useSelector } from "react-redux";

import "./App.css";
import { authSelectors } from "./containers/auth/selectors";
import { useGetUserQuery } from "./api/apiSlice";
import Nav from "./components/nav/Nav";
import PlaylistTrackDisplay from "./components/playListTrackDisplay/PlayListTrackDisplay";

const App: FC = (): ReactElement => {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  // console.log("isDark:", localStorage.getItem("isDark"));

  const accessToken = useSelector(authSelectors.getAccessToken);

  const {
    data: user,
    isLoading,
    isError
  } = useGetUserQuery(undefined, {
    skip: !accessToken
  });

  if (isLoading) {
    return <p className="loginText">Loading user data...</p>;
  }

  if (isError || !user) {
    return <p className="loginText">Failed to fetch user data. Please try again.</p>;
  }

  // console.log("User token:", accessToken);
  // console.log("User info:", user);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Nav isDark={isDark} toggleDarkMode={() => setIsDark(!isDark)} />
      <PlaylistTrackDisplay />
    </div>
  );
};

export default App;
