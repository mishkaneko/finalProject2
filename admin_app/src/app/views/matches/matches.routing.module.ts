import { MatchComponent } from './match/match.component';
import { MatchesComponent } from './matches.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MatchesComponent,
    data: {
      title: 'Matches',
    },
  },
  {
    path: ':id',
    component: MatchComponent,
    data: {
      title: `Match`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchesRoutingModule {}
