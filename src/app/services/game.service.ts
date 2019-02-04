import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Game } from '../models/Game';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class GameService {
  gameUrl: string = 'http://localhost:8080/SpringMVCCustom/game';

  constructor(private http: HttpClient) { }

  getGames() : Observable<Game[]> {
    let date = new Date();
    let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
		                    .toISOString()
		                    .split("T")[0];
    let url = `${this.gameUrl}?date=${dateString}`
    return this.http.get<Game[]>(url);
  }
}
