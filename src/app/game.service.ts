import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from './player';
import {environment} from '../environments/environment';

interface Game {
  id?: string;
  players: Player[];
  inProgress: boolean;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseURL = environment.serverURL + '/api/games';
  options = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Pragma: 'no-cache',
      Expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
      'Cache-Control': 'no-cache'
    }
  };

  constructor(private http: HttpClient) { }

  get(game: Game) {
    return this.http.get(this.baseURL + '/' + game.id, this.options);
  }

  getAll(game: Game) {
    return this.http.get(this.baseURL, this.options);
  }

  create(game: Game) {
    return this.http.post(this.baseURL, game, this.options);
  }

  start(game: Game) {
    return this.http.put(this.baseURL + '/' + game.id + '/start', game, this.options);
  }

  remove(game: Game) {
    return this.http.delete(this.baseURL + '/' + game.id, this.options);
  }

  end(game: Game) {
    return this.http.put(this.baseURL + '/' + game.id + '/end', game, this.options);
  }
}
