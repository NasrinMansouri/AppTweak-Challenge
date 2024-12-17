import React from "react";
import styles from "./SearchResult.module.css";

interface Props {
  results: { id: string; name: string; cover: string }[];
}

const SearchResult = ({ results }: Props) => {
  if (!results.length) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>No Result Found</h2>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      {results.map((track) => (
        <div key={track.id} className={styles.trackCard}>
          <img src={track.cover || ""} alt={track.name} className={styles.coverImage} />
          <div className={styles.trackInfo}>
            <h3 className={styles.trackName}>{track.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
