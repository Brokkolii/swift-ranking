import { Component, OnInit } from '@angular/core';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  songs: any[] = [];

  constructor(private songsService: SongsService) {}

  ngOnInit() {
    this.songsService.getSongs().subscribe(songs => {
      this.songs = songs;
    });
  }
}
