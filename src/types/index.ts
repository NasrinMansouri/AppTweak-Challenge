export type User = {
  id: string;
  display_name: string;
  email: string;
  country: string;
  images?: { url: string }[];
};

export type SpotifyPlaylist = {
  items: {
    id: string;
    name: string;
    description: string;
  }[];
};

export type SpotifyTrackItem = {
  track: {
    id: string;
    name: string;
    artists: { name: string; id: string }[]; // List of artists associated with the track
    album: {
      id: string;
      name: string;
      images: { url: string }[];
      release_date: string;
    };
    duration_ms: number;
  };
};

export type SpotifyTrack = {
  items: SpotifyTrackItem[];
};
