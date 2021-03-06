import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms'
import { HttpClientModule } from '@angular/common/http'
import { PopoverModule } from 'ngx-popover'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartistModule } from 'ng-chartist';

import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlayersComponent } from './components/players/players.component';
import { LineupBuilderComponent } from './components/lineup/lineup-builder/lineup-builder.component';

import { PlayerService } from './services/player.service';
import { LineupService } from './services/lineup.service';
import { LoginService } from './services/login.service';
import { GameService } from './services/game.service';

import { PlayersPipe } from './components/players/players.pipe';
import { LineupsComponent } from './components/lineup/lineups/lineups.component';
import { LoginComponent } from './components/login/login.component';
import { GameComponent } from './components/game/game.component';
import { LineupDetailsComponent } from './components/lineup/lineup-details/lineup-details.component';
import { PlayerDetailsComponent } from './components/players/player-details/player-details.component';
import { LineupResultChartComponent } from './components/lineup/lineup-result-chart/lineup-result-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    PlayersComponent,
    PlayersPipe,
    LineupBuilderComponent,
    LineupsComponent,
    LoginComponent,
    GameComponent,
    LineupDetailsComponent,
    PlayerDetailsComponent,
    LineupResultChartComponent
  ],
  entryComponents:[PlayerDetailsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    PopoverModule,
    InfiniteScrollModule,
    NgbModule.forRoot(),
    ChartistModule
  ],
  providers: [PlayerService, LineupService, LoginService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
