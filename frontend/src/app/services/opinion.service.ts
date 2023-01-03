import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Song } from '../types/song';

@Injectable({
  providedIn: 'root',
})
export class OpinionService {
  constructor(private http: HttpClient) {}

  getOpinion(song: Song): Observable<any> {
    return this.http
      .post<any>(environment.apiBaseUrl + '/opinion', {
        artist: song.artists,
        song: song.name,
      })
      .pipe(
        map((opinion) => opinion.text.trim()),
        tap((opinion) => console.log(opinion))
      );
  }
}
