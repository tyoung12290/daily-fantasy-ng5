import { Pipe, PipeTransform } from '@angular/core';

import { Player } from '../../models/Player'

@Pipe({
  name: 'players'
})
export class PlayersPipe implements PipeTransform {
  transform(players: Array<any>, search: any): Array<any> {
    console.log(players)
      if(!search.pos){
         return players;
      }
      console.log(players)
      return players.filter(player => player.player.pos === search.pos);
    }
  // transform(players: Player[]) {
  //   console.log(players)
  //   return players.filter(player => player.player.pos === 'PG');
  // }

}
