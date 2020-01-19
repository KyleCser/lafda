import { Component } from '@angular/core';
import {SideGame} from './side-game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lafda';

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
}
