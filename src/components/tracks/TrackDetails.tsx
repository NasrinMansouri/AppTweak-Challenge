import React from "react";
import { SpotifyTrackItem } from "../../types";
import styles from "./TrackDetails.module.css";

interface Props {
  tracks: SpotifyTrackItem[];
  isFetching: boolean;
}

const TrackDetails = ({ tracks, isFetching }: Props) => {
  if (isFetching) return null;
  if (!tracks.length) return <p>No tracks found for this playlist.</p>;

  return (
    <div className={styles.tracksSection}>
      {/* Track List */}
      <ul className={styles.trackList}>
        {tracks.map((item) => (
          <li key={item.track.id} className={styles.trackItem}>
            {/* Album Cover */}
            <div className={styles.albumCoverContainer}>
              {item.track.album.images?.[0]?.url && (
                <img
                  src={item.track.album.images[0].url}
                  alt={item.track.album.name}
                  className={styles.albumCover}
                />
              )}
            </div>

            {/* Track Details */}
            <div className={styles.trackDetails}>
              {/* Track Name and Artists */}
              <div className={styles.trackNameContainer}>
                <p className={styles.trackName}>{item.track.name}</p>
                <p className={styles.artists}>
                  {item.track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>

              {/* Album Name and Release Date */}
              <div className={styles.trackInfo}>
                <p className={styles.albumName}>{item.track.album.name}</p>
                <p className={styles.releaseDate}>{item.track.album.release_date || "N/A"}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackDetails;
