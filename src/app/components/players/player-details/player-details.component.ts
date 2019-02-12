import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerService } from '../../../services/player.service';
import {ILineChartOptions,IChartistAnimationOptions,IChartistData, Chartist} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
//import { Legend } from 'chartist-plugin-legend/chartist-plugin-legend.js';


@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  @Input() player;
  playerDetails: any;
  labels: any=[];
  projectedScoreSeries:any=[];
  actualScoreSeries:any=[];
  series:any=[];
  type: ChartType = 'Line';
  data: IChartistData;

  options: ILineChartOptions = {
    axisX: {
      showGrid: false
    },
    height: 300,
    // plugins: [
    //     Chartist.plugins.Legend({
    //         legendNames: ['Blue pill', 'Red pill', 'Purple pill'],
    //     })
    // ]

  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'line') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };

  constructor(private playerService: PlayerService,public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.playerService.getPlayers({'player':this.player.player.id}).subscribe(players => {
      players = players.filter(player =>
        player.actualScore >0)
      this.setData(players)
      players.forEach(player=>{
        player.scoreDiff = player.projectedScore-player.actualScore;
      })
      this.playerDetails = players

      this.data = {
        labels: (this.labels),
        series: this.series
      };
    })
  }


  filterPlayerDetails(players){
    players.forEach(player=>{

    })
  }

  setData(players:any) {
    for (let player of players){
      this.labels.push(player.date);
      this.projectedScoreSeries.push(player.projectedScore);
      this.actualScoreSeries.push(player.actualScore);
    }
    this.series.push(this.projectedScoreSeries);
    this.series.push(this.actualScoreSeries)
  }

}
