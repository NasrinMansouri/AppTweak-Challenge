import React, { useState, useEffect } from "react";

import { useGetPlaylistsQuery, useGetPlaylistTracksQuery } from "../../api/apiSlice";
import PlaylistSelector from "../playList/playlistSelector";
import TrackDetails from "../tracks/TrackDetails";
import { SpotifyPlaylist, SpotifyTrackItem } from "../../types";
import styles from "./PlayListTrackDisplay.module.css";
import Sorting from "../sorting/Sorting";

const PlaylistTrackDisplay = () => {
  const [selected, setSelected] = useState<string>(""); // Track ID of the selected playlist
  const [description, setDescription] = useState<string>(""); //store the description of the selected playlist
  const [tracks, setTracks] = useState<SpotifyTrackItem[]>([]); //store an array of the tracks for the selected playlist
  const [sortOrder, setSortOrder] = useState<string>(""); //store the selected sort order for the tracks

  // Get playlists and playlist tracks
  const { data: playlists, isLoading, isError } = useGetPlaylistsQuery();
  const { data: trackData, isFetching: isFetchingTracks } = useGetPlaylistTracksQuery(
    selected ? `/playlists/${selected}/tracks` : "",
    { skip: !selected }
  );

  // update the selected playlist id to the first playlist and its description
  useEffect(() => {
    if (playlists?.items?.length) {
      // console.log("Playlist Structure:", JSON.stringify(playlists, null, 2));
      const firstPlaylist = playlists.items[0];
      setSelected(firstPlaylist.id);
      setDescription(firstPlaylist.description);
    }
  }, [playlists]);

  // Update the tracks state variable with the items array from the trackData object if it exists
  useEffect(() => {
    if (trackData?.items) {
      // console.log("Track Data Structure:", JSON.stringify(trackData, null, 2));
      setTracks(trackData.items);
    } else {
      setTracks([]);
    }
  }, [trackData]);

  // Function to handle playlist selection and its description
  const handlePlaylistSelect = (playlist: SpotifyPlaylist["items"][number]) => {
    setSelected(playlist.id);
    setDescription(playlist.description);
  };

  // Sorting functions
  // Create a dictionary of sorting, function that takes two arguments and returns a number
  const sortFunctions: { [key: string]: (a: SpotifyTrackItem, b: SpotifyTrackItem) => number } = {
    name: (a, b) => a.track.name.toLocaleLowerCase().localeCompare(b.track.name),
    artist: (a, b) =>
      a.track.artists[0]?.name.toLocaleLowerCase().localeCompare(b.track.artists[0]?.name),
    album: (a, b) => a.track.album.name.localeCompare(b.track.album.name),
    duration: (a, b) => a.track.duration_ms - b.track.duration_ms
  };

  // Function to handle sort order change
  const handleSortOrderChange = (sortOrder: string) => {
    const sortedTracks = [...tracks];

    if (sortFunctions[sortOrder]) {
      sortedTracks.sort(sortFunctions[sortOrder]);
    }
    setSortOrder(sortOrder);
    setTracks(sortedTracks);
  };

  if (isLoading) return null;
  if (isError || !playlists?.items) return <div>Error fetching playlists</div>;

  return (
    <div className={styles.container}>
      <div className={styles.selectorsContainer}>
        <PlaylistSelector
          playlists={playlists.items}
          onSelect={handlePlaylistSelect}
          selectedId={selected}
          description={description}
        />
        <Sorting sortOrder={sortOrder} onSelectSortOrder={handleSortOrderChange} />
      </div>
      <TrackDetails tracks={tracks} isFetching={isFetchingTracks} />
    </div>
  );
};

export default PlaylistTrackDisplay;
