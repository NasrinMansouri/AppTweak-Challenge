import React from "react";

import styles from "./Nav.module.css";
import Profile from "../profile/Profile";
import Search from "../search/Search";
import ToggleMode from "../mode/ToggleMode";

interface Props {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Nav = ({ isDark, toggleDarkMode }: Props) => {
  return (
    <div className={styles.nav}>
      <Profile />
      <Search />
      <ToggleMode isChecked={isDark} handleChange={toggleDarkMode} />
    </div>
  );
};

export default Nav;
