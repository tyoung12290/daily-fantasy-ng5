import { Component, OnInit } from '@angular/core';
import { LineupService } from '../../../services/lineup.service'
import { Lineup } from '../../../models/Lineup'

import { Player } from '../../../models/Player'

@Component({
  selector: 'app-lineup-builder',
  templateUrl: './lineup-builder.component.html',
  styleUrls: ['./lineup-builder.component.css']
})
export class LineupBuilderComponent implements OnInit {

  players: Player[];
  remSalary:number
  salaryPerPlayer:number;
  points:number;
  playerCount:any;

  constructor(private lineupService: LineupService) { }

  ngOnInit() {
    this.lineupService.lineup=new Lineup
    this.lineupService.lineup.playerDetails=this.lineupService.players
    this.players=this.lineupService.players;
    this.remSalary=this.lineupService.remSalary;
    this.salaryPerPlayer = this.lineupService.salaryPerPlayer;
    this.points=this.lineupService.points;
  }

  onAddedPlayer(player: Player){
    for(let cur of this.lineupService.players){
      if(player.player.pos ===cur.pos && !(Object.keys(cur).length >2)) {
        this.lineupService.playerCount[cur.pos] ++;
        this.lineupService.playerCount.total ++;
        this.lineupService.remSalary=this.lineupService.remSalary - player.salary
        this.lineupService.points=this.lineupService.points + player.projectedScore;
        this.lineupService.calcPlayerDiff();
        console.log(this.lineupService.playerDiff)
        this.lineupService.salaryPerPlayer=(this.lineupService.playerDiff<=0)? 0 : this.lineupService.remSalary/this.lineupService.playerDiff;
        Object.assign(cur,player);
        break;
      }
    }
  }
  removePlayer(activePlayer){
      for (let player of this.lineupService.players){
        if(activePlayer.id==player.id){
          let index = this.lineupService.players.indexOf(player);
              this.lineupService.players[index] = {
              lineupSlot: this.lineupService.players[index].lineupSlot ,
              pos :this.lineupService.players[index].pos
          }
          this.lineupService.playerCount[player.pos] --;
          this.lineupService.playerCount.total --;
          this.lineupService.remSalary=this.lineupService.remSalary + player.salary;
          this.lineupService.points=this.lineupService.points - player.projectedScore;
          this.lineupService.salaryPerPlayer=(this.lineupService.playerDiff<=0)? 0:this.lineupService.remSalary/(this.lineupService.playerDiff)
          break;
        }
      }
    }
  clearLineup(lineup){
    for(let player of this.lineupService.players){
				if(Object.keys(player).length > 2){
					this.removePlayer(player);
				}

			}
      if(lineup.hasOwnProperty('id')){
        lineup.date='';
  			lineup.id='';
      }

  }

  saveOrUpdateLineup() {
    if(this.lineupService.lineup.hasOwnProperty('id')){
      this.lineupService.updateLineup().subscribe();
    }else{
      let date = new Date();
      let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                          .toISOString()
                          .split("T")[0];
      this.lineupService.lineup = new Lineup();
      this.lineupService.lineup.playerDetails=this.lineupService.players;
      this.lineupService.lineup.userId=1;
      this.lineupService.lineup.date=dateString;
      this.lineupService.saveLineup().subscribe();
    }

    }

}
