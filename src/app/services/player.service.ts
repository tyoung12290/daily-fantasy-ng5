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

  getPlayers(filters) : Observable<Player[]> {

    let url = this.buildFilter(filters)
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

  buildFilter(filters:any){
    let queryString = ''
    Object.keys(filters).forEach(function(key) {
      queryString += `${key}=${filters[key]}`
    });
    console.log(`${this.playerUrl}?${queryString}`)
      return `${this.playerUrl}?${queryString}`
  }
}
