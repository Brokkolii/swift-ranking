import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankComponent } from './pages/rank/rank.component';

const routes: Routes = [
  { path: '', redirectTo: '/rank', pathMatch: 'full' },
  { path: 'rank', component: RankComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
