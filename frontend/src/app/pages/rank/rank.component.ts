import { Component, Input } from '@angular/core';
import { SongsService } from 'src/app/services/songs.service';
import { RankedSong } from 'src/app/types/ranked-song';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss'],
})
export class RankComponent {
  rankedSongs: RankedSong[] = [];
  viewPortRankedSongs: RankedSong[] = [];

  song1: any;
  song2: any;

  AmountOfDecisions = 0;

  constructor(private songsService: SongsService) {}

  ngOnInit() {
    this.songsService.getSongs().subscribe((songs) => {
      songs.forEach((song: any) => {
        this.rankedSongs.push({
          song: song,
          before: [],
          after: [],
        });
      });
      this.updateSongs();
    });
  }

  songChosen(chosenSongs: any) {
    this.AmountOfDecisions++;
    const winner = chosenSongs.winner;
    const looser = chosenSongs.looser;

    for (let i in this.rankedSongs) {
      const currentSong = this.rankedSongs[i].song;
      const currentBefore = this.rankedSongs[i].before;
      const currentAfter = this.rankedSongs[i].after;

      if (currentSong.id === winner.id) {
        // song is winner
        currentBefore.push(looser);
      } else if (currentSong.id === looser.id) {
        //song is looser
        currentAfter.push(winner);
      } else if (
        currentBefore.findIndex((song) => song.id === winner.id) !== -1
      ) {
        //song is before winner
        if (currentBefore.findIndex((song) => song.id === looser.id) === -1) {
          currentBefore.push(looser);
        }
      } else if (
        currentAfter.findIndex((song) => song.id === looser.id) !== -1
      ) {
        //song is after looser
        if (currentAfter.findIndex((song) => song.id === winner.id) === -1) {
          currentAfter.push(winner);
        }
      }
    }

    this.updateSongs();
    this.updateRanking();
  }

  updateSongs() {
    let bannedSong1s = [];
    this.song1 = null;
    this.song2 = null;
    let itterations = 0;
    while ((!this.song1 || !this.song2) && itterations < 50) {
      itterations++;
      this.song1 = null;
      this.song2 = null;
      let song1childCount = this.rankedSongs.length;
      let song2childCount = this.rankedSongs.length;

      for (let i in this.rankedSongs) {
        if (
          this.rankedSongs[i].before.length < song1childCount &&
          bannedSong1s.filter((song) => song.id === this.rankedSongs[i].song.id)
            .length === 0
        ) {
          song1childCount = this.rankedSongs[i].before.length;
          this.song1 = this.rankedSongs[i].song;
        }
        if (
          this.rankedSongs[i].after.length < song1childCount &&
          bannedSong1s.filter((song) => song.id === this.rankedSongs[i].song.id)
            .length === 0
        ) {
          song1childCount = this.rankedSongs[i].after.length;
          this.song1 = this.rankedSongs[i].song;
        }
      }

      if (!this.song1) {
        return;
      }

      for (let i in this.rankedSongs) {
        if (
          this.rankedSongs[i].before.length < song2childCount &&
          this.rankedSongs[i].song.id !== this.song1.id &&
          this.rankedSongs[i].before.filter((song) => song.id === this.song1.id)
            .length === 0 &&
          this.rankedSongs[i].after.filter((song) => song.id === this.song1.id)
            .length === 0
        ) {
          song2childCount = this.rankedSongs[i].before.length;
          this.song2 = this.rankedSongs[i].song;
        }
        if (
          this.rankedSongs[i].after.length < song2childCount &&
          this.rankedSongs[i].song.id !== this.song1.id &&
          this.rankedSongs[i].after.filter((song) => song.id === this.song1.id)
            .length === 0 &&
          this.rankedSongs[i].before.filter((song) => song.id === this.song1.id)
            .length === 0
        ) {
          song2childCount = this.rankedSongs[i].after.length;
          this.song2 = this.rankedSongs[i].song;
        }
      }

      if (!this.song2) {
        bannedSong1s.push(this.song1);
      }
    }
  }

  updateRanking() {
    let hadToChange = false;
    let itterations = 0;
    do {
      itterations++;
      //TODO: somehow it runs in an infinite loop
      hadToChange = false;

      this.rankedSongs.forEach((song) => {
        song.before.forEach((beforeSong) => {
          let songHit = false;
          this.rankedSongs.forEach((potBeforeSong) => {
            if (potBeforeSong.song.id === song.song.id) {
              songHit = true;
            }
            if (!songHit && potBeforeSong.song.id === beforeSong.id) {
              hadToChange = true;
              //insert potBeforeSong before song
              if (itterations > 1000) {
                console.log(
                  'changing',
                  potBeforeSong.song.name + ' and ' + song.song.name
                );
              }
              this.putSongAfterSong(potBeforeSong.song, song.song);
            }
          });
        });
      });
      this.rankedSongs.forEach((song) => {
        song.after.forEach((afterSong) => {
          let songHit = false;
          this.rankedSongs.forEach((potAfterSong) => {
            if (potAfterSong.song.id === song.song.id) {
              songHit = true;
            }
            if (songHit && potAfterSong.song.id === afterSong.id) {
              hadToChange = true;
              //insert potAfterSong after song
              if (itterations > 1000) {
                console.log(
                  'changing',
                  potAfterSong.song.name + ' and ' + song.song.name
                );
              }
              this.putSongAfterSong(potAfterSong.song, song.song);
            }
          });
        });
      });

      if (itterations > 1000) {
        console.log('too many itterations');
        return;
      }
    } while (hadToChange);
  }

  putSongBeforeSong(song: any, beforeSong: any) {
    // find the index of the element you want to move
    let index = this.rankedSongs.findIndex(
      (item: any) => item.song.id === song.id
    );
    const rankedSong = this.rankedSongs[index];
    // find the index of the element before which you want to move the element
    let beforeIndex = this.rankedSongs.findIndex(
      (item: any) => item.song.id === beforeSong.id
    );

    // remove the element at index and add it to beforeIndex
    this.rankedSongs.splice(index, 1);

    this.rankedSongs = [
      ...this.rankedSongs.slice(0, beforeIndex),
      rankedSong,
      ...this.rankedSongs.slice(beforeIndex),
    ];
  }

  putSongAfterSong(song: any, afterSong: any) {
    // find the index of the element you want to move
    let index = this.rankedSongs.findIndex(
      (item: any) => item.song.id === song.id
    );

    const rankedSong = this.rankedSongs[index];

    // find the index of the element before which you want to move the element
    let afterIndex = this.rankedSongs.findIndex(
      (item: any) => item.song.id === afterSong.id
    );

    // remove the element at index and add it to beforeIndex
    this.rankedSongs.splice(index, 1);

    this.rankedSongs = [
      ...this.rankedSongs.slice(0, afterIndex + 1),
      rankedSong,
      ...this.rankedSongs.slice(afterIndex + 1),
    ];
  }
}
