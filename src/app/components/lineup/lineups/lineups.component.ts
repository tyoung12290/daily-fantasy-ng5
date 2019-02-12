import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { LineupService } from '../../../services/lineup.service'
import { Lineup } from '../../../models/Lineup'
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-lineups',
  templateUrl: './lineups.component.html',
  styleUrls: ['./lineups.component.css']
})
export class LineupsComponent implements OnInit {
  lineupType: String;
  lineups: Lineup[];
  sortedLineups: Lineup[];
  rowsControl =[];
  constructor(
    private lineupService: LineupService,
    private loginService: LoginService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.get("lineupType") === 'optimized'){
        this.getOptimizedLineups();
      }else {
          this.getLineups(1);
      }
  })



  }

  getLineups(userId:number){
    this.lineupService.getLineups(userId).subscribe(lineups => {
      this.lineupService.formatLineups(lineups)
      this.lineups=this.lineupService.sortLineups('-date', lineups);
    })
  }

  getOptimizedLineups(){
    this.lineupService.getOptimizedLineups(1).subscribe(lineups => {
      this.lineupService.formatLineups(lineups)
      this.lineups=this.lineupService.sortLineups('projectedScore', lineups).reverse();
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
