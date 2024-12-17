import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from "./Sorting.module.css";

interface Props {
  onSelectSortOrder: (sortOrder: string) => void;
  sortOrder: string; // receive the selecetd sort order as a prop from the parent component
}

const Sorting = ({ onSelectSortOrder, sortOrder }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelection = (value: string) => {
    onSelectSortOrder(value); // Notify the parent of the selected sort order
    setIsDropdownOpen(false);
  };

  const sortOrders = [
    { value: "", label: "Default" },
    { value: "name", label: "Name" },
    { value: "artist", label: "Artists" },
    { value: "duration", label: "Duration" },
    { value: "album", label: "Album" }
  ];

  const currentSortOrder = sortOrders.find((order) => order.value === sortOrder);

  return (
    <div className={styles.dropdownContainer}>
      {/* Dropdown Header */}
      <div className={styles.dropdownHeader} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span>Sort by: {currentSortOrder?.label || "Default"} </span>
        <div className={styles.iconContainer}>
          <RiArrowDropDownLine className={`${styles.icon} ${isDropdownOpen ? styles.open : ""}`} />
        </div>
      </div>

      {/* Dropdown List */}
      {isDropdownOpen && (
        <ul className={styles.dropdownList}>
          {sortOrders.map((order) => (
            <li
              //   onClick={() => onSelectSortOrder(order.value)}
              onClick={() => handleSelection(order.value)}
              key={order.value}
              value={order.value}
              className={styles.dropdownItem}
            >
              {order.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sorting;
