import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../../services/player.service'
import { Player } from '../../models/Player'
import { LineupService } from '../../services/lineup.service';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
    players: Player[];
    filteredPlayers: Player[];
    positions=['PG','SG','SF','PF','C','All']
    search = {'pos':'', 'fuzzy':''}
    @Output() addedPlayer = new EventEmitter<Player>();

  constructor(private playerService: PlayerService, private lineupService: LineupService, private modalService: NgbModal) { }

  ngOnInit() {
    let date = new Date();
    let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
		                    .toISOString()
		                    .split("T")[0];

    this.playerService.getPlayers({'date':dateString}).subscribe(players => {
      console.log(players)
      for (let player of players){
        player.pointsPerDollar= player.projectedScore/(player.salary/1000);
      }
      this.players=this.sortPlayers('pointsPerDollar', players).reverse()
      this.filteredPlayers = this.players;
  })
}

  sortPlayers(prop: string, object: any) {
    object = object.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    // asc/desc
    if (prop.charAt(0) === '-') {
      object.reverse(); }
    return object;
  }

  inLineup(playerId){
    let bool = false;
    for (let player of this.lineupService.players){
      if((Object.keys(player).length > 2) && player.id === playerId){
        bool = true;
      }
    }
    return bool;
  }

  performFilter(value: string,type: string) {
    console.log(type)
    if(type === 'posFilter'){
      this.search.pos = value=="All"? this.search.pos = '' : value
      this.filteredPlayers=  this.players.filter(player => player.player.pos.indexOf(this.search.pos) !== -1)
    }
    if(type ==='nameFilter'){
      this.search.fuzzy = value
      this.filteredPlayers = this.players.filter(player =>
        player.player.firstName.toLowerCase().includes(this.search.fuzzy.toLowerCase()) ||
        player.player.lastName.toLowerCase().includes(this.search.fuzzy.toLowerCase()))
    }

    }


    addPlayer(player: Player){
      console.log(player)
      this.addedPlayer.emit(player);
    }

    open(player){
      const modalRef = this.modalService.open(PlayerDetailsComponent);
        modalRef.componentInstance.player = player;
      }

}
