import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Song } from '../types/song';
import { ApiTrackData } from '../types/api-track-data';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http
      .get<ApiTrackData[]>(environment.apiBaseUrl + '/songs')
      .pipe(
        map((response: ApiTrackData[]) =>
          response.map((song: ApiTrackData) => {
            return {
              name: song.name,
              artists: song.artists.map((artist) => artist.name).join(', '),
              duration: msToSongDuration(song.duration_ms),
              explicit: song.explicit,
              spotifyUrl: song.external_urls.spotify,
              previewUrl: song.preview_url,
              trackNumber: song.track_number,
              album: {
                color: song.album.color,
                image: song.album.images[0].url,
                id: song.album.id,
                name: song.album.name,
              },
              id: song.id,
            };
          })
        ),
        map((songs: Song[]) => shuffle(songs))
      );
  }
}

function msToSongDuration(ms: number) {
  let mins = Math.floor(ms / 60000);
  let secs = Math.floor((ms % 60000) / 1000)
    .toString(10)
    .padStart(2, '0');
  return mins + ':' + secs;
}

function shuffle(a: Song[]) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
