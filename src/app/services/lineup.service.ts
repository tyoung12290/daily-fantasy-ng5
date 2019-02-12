import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Lineup } from '../models/Lineup';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()

export class LineupService {
  remSalary:number = 60000
  salaryPerPlayer:number = this.remSalary/9;
  points:number = 0;
  lineup:Lineup;
  lineups: Lineup[];
  players:any =[
    {lineupSlot:1, pos:'PG'},
    {lineupSlot:2, pos:'PG'},
    {lineupSlot:3, pos:'SG'},
    {lineupSlot:4, pos:'SG'},
    {lineupSlot:5, pos:'SF'},
    {lineupSlot:6, pos:'SF'},
    {lineupSlot:7, pos:'PF'},
    {lineupSlot:8, pos:'PF'},
    {lineupSlot:9, pos:'C'}
  ]
  playerCount:any=
  {
    PG:0,
    SG:0,
    SF:0,
    PF:0,
    C:0,
    total:0
  }
  maxPlayerCount:any =
  {
    PG:2,
    SG:2,
    SF:2,
    PF:2,
    C:1,
    total:9
  }
  playerDiff:number = this.maxPlayerCount.total-this.playerCount.total;

  url: string = 'http://localhost:8080/SpringMVCCustom/lineup';

  constructor(private http: HttpClient) { }


  getLineups(id:number) : Observable<Lineup[]> {
    const url =`${this.url}?userId=${id}`
    return this.http.get<Lineup[]>(url);
  }

  getOptimizedLineups(numOfLineups:number) : Observable<Lineup[]> {
    const url =`${this.url}/optimized`
    console.log(url)
    return this.http.get<Lineup[]>(url);
  }
  formatLineups(lineups){
    lineups.forEach(lineup => {
        lineup.projectedScore = 0;
        lineup.totalSalary = 0;
        lineup.actualScore=0;
        lineup.scoreDiff=0;
        for(let player of lineup.playerDetails){
          lineup.projectedScore += player.projectedScore;
          lineup.actualScore +=player.actualScore;
          lineup.totalSalary += player.salary;
        }
        lineup.scoreDiff = lineup.projectedScore - lineup.actualScore
      })
      this.lineups=this.sortLineups('-date', lineups);
    }
  sortLineups(prop: string, object: any) {
    object = object.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    // asc/desc
    if (prop.charAt(0) === '-') {
      object.reverse(); }
    return object;
  }

  saveLineup(): Observable<Lineup>{
    this.http.post<Lineup>(this.url, this.lineup, httpOptions)
    return this.http.post<Lineup>(this.url, this.lineup, httpOptions)
  }

  updateLineup(): Observable<Lineup>{
    const url =`${this.url}/${this.lineup.id}`
    return this.http.put<Lineup>(this.url, this.lineup, httpOptions)
  }

  getLineup(id: number): Observable<Lineup>{
    const url =`${this.url}/${id}`
    return this.http.get<Lineup>(url)
  }

  deleteLineup(lineup: Lineup):Observable<Lineup>{
    const url =`${this.url}/${lineup.id}`
    return this.http.delete<Lineup>(url)
  }

  calcPlayerDiff(){
    this.playerDiff=this.maxPlayerCount.total-this.playerCount.total
  }
}
