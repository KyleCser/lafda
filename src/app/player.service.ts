import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  baseURL = 'http://localhost:4206';

  constructor(private http: HttpClient) { }

  getAllPlayers() {
    return this.http.get(this.baseURL + '/api/players');
  }

  addPlayer(player: Player) {
    return this.http.post(this.baseURL + '/api/players', player);
  }
}
