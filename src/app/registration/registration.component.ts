import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../player';
import {SideGame} from '../side-game';
import {PlayerService} from '../player.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationCost = 5;

  player: Player = {
    name: '',
    division: 'men',
    sideGames: [],
    totalCost: 5
  };
  @Input() sideGames: SideGame[];

  ngOnInit() { }

  constructor(private playerService: PlayerService) { }

  addPlayer(player) {
    this.playerService.addPlayer(player)
      .subscribe((result: JSON) => {
        if (result[`inserted`] === 1) {
          player[`id`] = result[`generated_keys`][0];
        }
      });
  }

  addSideGame(game) {
    if (game.checked) {
     this.player.sideGames.push(game);
     this.player.totalCost += game.cost;
    } else {
     this.player.totalCost -= game.cost;
     this.player.sideGames = this.player.sideGames.filter((alreadySelected: SideGame) => {
       return alreadySelected.value !== game.value;
     });
    }
  }

}
