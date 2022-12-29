import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Song } from 'src/app/types/song';

@Component({
  selector: 'app-chooser',
  templateUrl: './chooser.component.html',
  styleUrls: ['./chooser.component.scss'],
})
export class ChooserComponent {
  @Input() song1?: Song;
  @Input() song2?: Song;

  @Output() onChoose = new EventEmitter<{ winner: Song; looser: Song }>();

  songChosen(winner: Song, looser: Song) {
    this.onChoose.emit({ winner: winner, looser: looser });
  }

  glass1Hovered = false;
  glass2Hovered = false;

  on_side = false;
}
