import { Component, OnInit } from '@angular/core';

import { LineupService } from '../../../services/lineup.service'
import { Lineup } from '../../../models/Lineup'
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-lineups',
  templateUrl: './lineups.component.html',
  styleUrls: ['./lineups.component.css']
})
export class LineupsComponent implements OnInit {
  lineups: Lineup[];
  rowsControl =[];
  constructor(private lineupService: LineupService, private loginService: LoginService) { }

  ngOnInit() {
    this.getLineups(1);
  }

  getLineups(userId:number){
    this.lineupService.getLineups(userId).subscribe(lineups => {
      for (let lineup of lineups){
        lineup.projectedScore = 0;
        lineup.totalSalary = 0;
        lineup.actualScore=0;
        for(let player of lineup.playerDetails){
          console.log(player)
          lineup.projectedScore += player.projectedScore;
          lineup.actualScore +=player.actualScore;
          lineup.totalSalary += player.salary;
        }
        this.rowsControl.push ({
          isCollapsed:true
        });
      }
      this.lineups=lineups;
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
    deleteLineup(lineup){
      this.lineupService.deleteLineup(lineup).subscribe(response=>{
        this.getLineups(1);
      });

		};
}
