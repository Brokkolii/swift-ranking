import { Album } from './album';

export interface Song {
  id: string;
  name: string;
  artists: string;
  duration: string;
  explicit: boolean;
  spotifyUrl: string;
  previewUrl: string;
  trackNumber: number;
  album: Album;
}
