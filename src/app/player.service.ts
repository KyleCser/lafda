import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  baseURL = 'http://localhost:6969';
  options = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Pragma: 'no-cache',
      Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
      'Cache-Control': 'no-cache'
    }
  };

  constructor(private http: HttpClient) { }

  getAllPlayers() {
    return this.http.get(this.baseURL + '/api/players', this.options);
  }

  addPlayer(player: Player) {
    return this.http.post(this.baseURL + '/api/players', player, this.options);
  }

  save(player: Player) {
    return this.http.put(this.baseURL + '/api/players/' + player.id, player, this.options);
  }

  remove(player: Player) {
    return this.http.put(this.baseURL + '/api/players/' + player.id, player, this.options);
  }
}
