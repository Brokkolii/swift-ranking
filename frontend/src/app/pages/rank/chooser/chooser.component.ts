import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { OpinionService } from 'src/app/services/opinion.service';
import { Song } from 'src/app/types/song';

@Component({
  selector: 'app-chooser',
  templateUrl: './chooser.component.html',
  styleUrls: ['./chooser.component.scss'],
})
export class ChooserComponent {
  constructor(private opinionService: OpinionService) {}

  @Input() song1?: Song;
  @Input() song2?: Song;

  @Output() onChoose = new EventEmitter<{ winner: Song; looser: Song }>();

  opinion: Observable<string> | undefined;

  lastWinner: Song | undefined;

  songChosen(winner: Song, looser: Song) {
    this.onChoose.emit({ winner: winner, looser: looser });
    if (this.lastWinner !== winner) {
      this.opinion = this.opinionService.getOpinion(winner);
      this.lastWinner = winner;
    }
  }

  glass1Hovered = false;
  glass2Hovered = false;

  on_side = false;
}
