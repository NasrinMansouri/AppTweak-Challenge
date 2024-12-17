import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { SpotifyPlaylist } from "../../types";
import styles from "./PlaylistSelector.module.css";

interface Props {
  playlists: SpotifyPlaylist["items"];
  onSelect: (playlist: SpotifyPlaylist["items"][number]) => void;
  selectedId: string;
  description: string;
}

const PlaylistSelector = ({ playlists, onSelect, selectedId, description }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelection = (playlist: SpotifyPlaylist["items"][number]) => {
    onSelect(playlist);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      {/* Dropdown Header */}
      <div className={styles.dropdownHeader} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <span>{playlists.find((playlist) => playlist.id === selectedId)?.name}</span>
        <RiArrowDropDownLine className={`${styles.icon} ${isDropdownOpen ? styles.open : ""}`} />
      </div>

      {/* Dropdown List */}
      {isDropdownOpen && (
        <ul className={styles.dropdownList}>
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              onClick={() => handleSelection(playlist)}
              className={styles.dropdownItem}
            >
              {playlist.name}
            </li>
          ))}
        </ul>
      )}
      <p className={styles.description}>
        {description.length > 80 ? `${description.slice(0, 80)}...` : description}
      </p>
    </div>
  );
};

export default PlaylistSelector;
