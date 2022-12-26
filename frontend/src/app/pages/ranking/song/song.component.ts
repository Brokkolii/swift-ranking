import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit{
  // input property
  @Input() song: any;

  constructor() { }

  ngOnInit() {
  }
}
