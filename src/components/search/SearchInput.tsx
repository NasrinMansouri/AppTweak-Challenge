import React from "react";
import styles from "./SearchInput.module.css";
import close from "../../icons/close.svg";
import search from "../../icons/search.svg";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

const SearchInput = ({ value, onChange, onClear }: Props) => (
  <div className={styles.inputWrapper}>
    {/* Search Icon */}
    <img src={search} alt="Search Icon" className={styles.searchIcon} />

    {/* Search Input */}
    <input
      className={styles.searchInput}
      type="text"
      placeholder="Search for tracks..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />

    {/* Clear Button */}
    {value && (
      <button className={styles.clearButton} onClick={onClear}>
        <img src={close} alt="Clear search" className={styles.closeIcon} />
      </button>
    )}
  </div>
);

export default SearchInput;
