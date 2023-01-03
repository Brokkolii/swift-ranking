import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../types/album';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor(private http: HttpClient) {}

  albums = [
    {
      id: '5eyZZoQEFQWRHkV2xgAeBw',
      //id: "56yYgfX6M5FlpETfyZSHkn", // Demi Lovato
      name: 'Taylor Swift',
    },
    {
      id: '4hDok0OAJd57SGIT8xuWJH',
      name: "Fearless (Taylor's Version)",
    },
    {
      id: '6Ar2o9KCqcyYF9J0aQP3au',
      name: 'Speak Now',
    },
    {
      id: '6kZ42qRrzov54LcAk4onW9',
      name: "Red (Taylor's Version)",
    },
    {
      id: '5fy0X0JmZRZnVa2UEicIOl',
      name: '1989',
    },
    {
      id: '6DEjYFkNZh67HP7R9PSZvv',
      name: 'Reputation',
    },
    {
      id: '1NAmidJlEaVgA3MpcPFYGq',
      name: 'Lover',
    },
    {
      id: '2fenSS68JI1h4Fo296JfGr',
      name: 'folklore',
    },
    {
      id: '6AORtDjduMM3bupSWzbTSG',
      name: 'evermore (deluxe version)', // right where you left me is missing on this one (deluxe?)
    },
    {
      id: '3lS1y25WAhcqJDATJK70Mq',
      name: 'Midnights (3am Edition)',
    },
  ];

  getAlbum(albumId: number): Observable<Album[]> {
    return this.http
      .get<any[]>(environment.apiBaseUrl + '/album/' + albumId)
      .pipe(
        map((response: any[]) =>
          response.map((album: any) => {
            return {
              color: {
                r: album.colors[0].r,
                g: album.colors[0].g,
                b: album.colors[0].b,
              },
              image: album.images[0].url,
              id: album.id,
              name: album.name,
            };
          })
        )
      );
  }
}
