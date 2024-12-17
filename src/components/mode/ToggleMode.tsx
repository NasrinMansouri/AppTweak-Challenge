import React from "react";

import styles from "./ToggleMode.module.css";

interface Props {
  isChecked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleMode = ({ isChecked, handleChange }: Props) => {
  return (
    <div className={styles.toggleContainer}>
      <input
        type="checkbox"
        id="ckeck"
        className={styles.toggle}
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="ckeck" className={styles.label}>
        {/* Dark mode */}
      </label>
    </div>
  );
};

export default ToggleMode;
