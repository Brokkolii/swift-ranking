import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/types/song';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent implements OnInit {
  // input property
  @Input() song?: Song;
  @Input() rank: number | undefined;
  constructor() {}
  ngOnInit(): void {}
}
