import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Player } from '../models/Player';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class PlayerService {
  playerUrl: string = 'http://localhost:8080/SpringMVCCustom/players';

  constructor(private http: HttpClient) { }

  getPlayers() : Observable<Player[]> {
    let date = new Date();
    let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
		                    .toISOString()
		                    .split("T")[0];
    let url = `${this.playerUrl}?date=${dateString}`
    return this.http.get<Player[]>(url);
  }

  saveplayer(player: Player): Observable<Player>{
    return this.http.post<Player>(this.playerUrl, player, httpOptions)
  }

  updateplayer(player: Player): Observable<Player>{
    const url =`${this.playerUrl}/${player.id}`
    return this.http.put<Player>(url, player, httpOptions)
  }

  getplayer(id: number): Observable<Player>{
    const url =`${this.playerUrl}/${id}`
    return this.http.get<Player>(url)
  }
}
