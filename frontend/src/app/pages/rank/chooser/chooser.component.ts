import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RankedSong } from 'src/app/types/ranked-song';

@Component({
  selector: 'app-chooser',
  templateUrl: './chooser.component.html',
  styleUrls: ['./chooser.component.scss'],
})
export class ChooserComponent {
  @Input() song1: any;
  @Input() song2: any;

  @Output() onChoose = new EventEmitter<any>();

  songChosen(winner: any, looser: any) {
    this.onChoose.emit({ winner: winner, looser: looser });
  }

  glass1Hovered = false;
  glass2Hovered = false;

  on_side = false;
}
