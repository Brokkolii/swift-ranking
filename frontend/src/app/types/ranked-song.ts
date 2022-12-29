import { Song } from './song';

export interface RankedSong {
  song: Song;
  before: Song[];
  after: Song[];
}
