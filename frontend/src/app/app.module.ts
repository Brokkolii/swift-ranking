import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongComponent } from './pages/rank/song/song.component';
import { RankComponent } from './pages/rank/rank.component';
import { ChooserComponent } from './pages/rank/chooser/chooser.component';

@NgModule({
  declarations: [AppComponent, SongComponent, RankComponent, ChooserComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ScrollingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
