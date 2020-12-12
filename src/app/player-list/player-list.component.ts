import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PlayerService} from '../player.service';
import {Player} from '../player';
import {SideGame} from '../side-game';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];
  @Input() sideGames: SideGame[];
  @Input() playerList: Player[];

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.playerService.getAllPlayers()
      .subscribe((listOfPlayers: Player[]) => {
        this.players = listOfPlayers.map((player: Player) => {
          const gamesNotIn = this.sideGames.filter((game: SideGame) => {
            return !player.sideGames.some((games2: SideGame) => {
              return game.label === games2.label;
            });
          });

          player.sideGames = player.sideGames.concat(JSON.parse(JSON.stringify(gamesNotIn)));
          return player;
        });
      }, (error) => {
        console.error(error);
      });

    this.playerService.newPlayer
      .subscribe((newPlayer: Player) => {
        if (newPlayer !== undefined) {
          this.players.push(newPlayer);
        }
      });
  }

  save(player: Player) {
    player.edit = !player.edit;
    this.playerService.save(player)
      .subscribe((result: any) => {
        console.log(result);
        if (result.replaced === 0) {
          // todo : error handling
        }
      });
  }

  remove(player: Player) {
    this.playerService.remove(player)
      .subscribe((result: any) => {
        console.log(result);
        this.players = this.players.filter((match: Player) => {
          return player['_id'] !== match['_id'];
        });
      });
  }
}
