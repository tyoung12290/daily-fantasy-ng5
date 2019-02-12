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

  getOptimizedLineups(){
    this.lineupService.getOptimizedLineups(1).subscribe(lineups => {
      lineups.forEach(lineup=>{
        lineup.projectedScore=0;
        lineup.playerDetails.forEach(player=>{
          lineup.projectedScore += player.projectedScore
        })
        delete lineup.id
      })
      console.log(lineups)
      lineups = this.lineupService.sortLineups('projectedScore', lineups).reverse();
      this.passLineupToBuilder(lineups[0]);
    })
  }
  passLineupToBuilder(lineup) {
			 for (let playerDtl of lineup.playerDetails){
			 	for(let lineupSlot of this.lineupService.players){
					if(lineupSlot.pos === playerDtl.player.pos && !lineupSlot.hasOwnProperty('id')){
						lineupSlot.playerDtlId=playerDtl.id;
						Object.assign(lineupSlot, playerDtl);
            this.lineupService.playerCount[playerDtl.player.pos] ++;
						this.lineupService.playerCount.total ++;
						this.lineupService.remSalary=this.lineupService.remSalary - playerDtl.salary;
						this.lineupService.points=this.lineupService.points + playerDtl.projectedScore;
						this.lineupService.salaryPerPlayer=(this.lineupService.playerDiff<=0)? 0:this.lineupService.remSalary/(this.lineupService.playerDiff)
						break;
					}
			 	}
			}
      this.lineupService.lineup = lineup;
		}

  onAddedPlayer(player: Player){
    for(let cur of this.lineupService.players){
      if(player.player.pos ===cur.pos && !(Object.keys(cur).length >2)) {
        this.lineupService.playerCount[cur.pos] ++;
        this.lineupService.playerCount.total ++;
        this.lineupService.remSalary=this.lineupService.remSalary - player.salary
        this.lineupService.points=this.lineupService.points + player.projectedScore;
        this.lineupService.calcPlayerDiff();
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
      let date = new Date;
      this.lineupService.lineup = new Lineup();
      this.lineupService.lineup.playerDetails=this.lineupService.players;
      this.lineupService.lineup.userId=1;
      this.lineupService.lineup.date=date;
      this.lineupService.saveLineup().subscribe();
    }

    }

}
