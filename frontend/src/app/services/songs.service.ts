import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private http: HttpClient) {}

  getSongs(): Observable<any> {
    return this.http.get('http://localhost:3080/api/songs').pipe(
      map((response:any)=>response.map((song:any)=>{
        return {
          "name": song.name,
          "artists": song.artists.map((artist:any)=>artist.name).join(', '),
          "duration": msToSongDuration(song.duration_ms),
          "explicit": song.explicit,
          "spotifyUrl": song.external_urls.spotify,
          "previewUrl": song.preview_url,
          "trackNumber": song.track_number,
          "album": song.album.name,
        }
      } ))
    );
  }
}

function msToSongDuration(ms: number) {

  let mins = Math.floor(ms / 60000);
  let secs = Math.floor((ms % 60000) / 1000).toString(10).padStart(2, '0');
  return mins + ':' + secs;
}