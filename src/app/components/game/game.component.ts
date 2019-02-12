import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../../services/game.service'
import { Game } from '../../models/Game'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  games:Game[];
  @Output() gameFilterSelect = new EventEmitter<Object>();
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getGames().subscribe(games => {
      this.games=games
  })
  }

  gameFilter(game: any){
    console.log(game)
    this.gameFilterSelect.emit(game);
  }
}
