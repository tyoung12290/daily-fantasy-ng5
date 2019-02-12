import { Component, OnInit, Input } from '@angular/core';
import {ILineChartOptions,IChartistAnimationOptions,IChartistData, Chartist} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import { Lineup } from '../../../models/Lineup';
import { LineupService } from '../../../services/lineup.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-lineup-result-chart',
  templateUrl: './lineup-result-chart.component.html',
  styleUrls: ['./lineup-result-chart.component.css']
})
export class LineupResultChartComponent implements OnInit {
  @Input() lineup: Lineup;
  lineups: Lineup[];
  labels: any=[];
  projectedScoreSeries:any=[];
  actualScoreSeries:any=[];
  series:any=[];
  type: ChartType = 'Line';
  data: IChartistData;
  lineupType: any;
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

  constructor(private lineupService: LineupService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.get("lineupType") === 'optimized'){
        this.getOptimizedLineups();
      }else {
          this.getLineups(1);
      }
  })

  }

  getOptimizedLineups(){
    this.lineupService.getOptimizedLineups(1).subscribe(lineups => {
      this.lineupService.formatLineups(lineups)
      this.lineups=this.lineupService.sortLineups('projectedScore', lineups).reverse();
      this.setData(lineups)
      this.data = {
        labels: (this.labels),
        series: this.series
      };
    })
  }
  getLineups(userId:number){
    this.lineupService.getLineups(userId).subscribe(lineups => {
      this.lineupService.formatLineups(lineups)
      this.lineups=this.lineupService.sortLineups('-date', lineups);
      this.setData(lineups)
      this.data = {
        labels: (this.labels),
        series: this.series
      };
    })
  }


setData(lineups:any) {
  this.series=[];
  this.labels=[];
  this.projectedScoreSeries=[];
  this.actualScoreSeries=[];
  for (let lineup of lineups){
    this.labels.push(lineups.date);
    this.projectedScoreSeries.push(lineup.projectedScore);
    this.actualScoreSeries.push(lineup.actualScore);
  }
  this.series.push(this.projectedScoreSeries);
  this.series.push(this.actualScoreSeries)
}

}
