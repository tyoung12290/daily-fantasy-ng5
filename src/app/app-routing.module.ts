import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { PlayersComponent } from './components/players/players.component'
import { LineupBuilderComponent } from './components/lineup/lineup-builder/lineup-builder.component'
import { LineupsComponent } from './components/lineup/lineups/lineups.component'
import { NotFoundComponent } from './components/not-found/not-found.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'lineup-builder', component: LineupBuilderComponent},
  {path: 'lineups', component: LineupsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule { }
