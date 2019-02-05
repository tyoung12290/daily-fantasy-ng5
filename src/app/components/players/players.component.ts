import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../../services/player.service'
import { Player } from '../../models/Player'
import { LineupService } from '../../services/lineup.service';

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

  constructor(private playerService: PlayerService, private lineupService: LineupService) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(players => {
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

    // performFilter(filterBy: string): IProduct[] {
    //     filterBy = filterBy.toLocaleLowerCase();
    //     return this.products.filter((product: IProduct) =>
    //         Object.keys(product).some(prop => {
    //             let value = product[prop];
    //             if (typeof value === "string") {
    //                 value = value.toLocaleLowerCase();
    //             }
    //             return value.toString().indexOf(filterBy) !== -1;
    //         })
    //     );
    // }
}
