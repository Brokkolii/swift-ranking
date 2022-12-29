import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
})
export class SongComponent {
  // input property
  @Input() song: any;
  @Input() rank: number | undefined;
  constructor() {}
}
