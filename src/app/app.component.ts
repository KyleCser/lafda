import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {SideGame} from './side-game';
import {Player} from './player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playerList: Player[] = [];
  sideGames: SideGame[] = [
    {
      label: '50/50 Throwdown',
      value: '5050',
      cost: 3
    },
    {
      label: 'Perfect Game',
      value: 'perfectGame',
      cost: 2
    },
    {
      label: 'Most Doubles Cass Fundraiser',
      value: 'mostDoubles',
      cost: 5
    }
  ];

  playerListChange(changes: Player) {
    this.playerList.push(changes);
  }
}
