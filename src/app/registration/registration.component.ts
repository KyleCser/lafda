import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  sideGames = [
    {
      label: '50/50 Throwdown',
      value: '5050',
      cost: '3.00'
    },
    {
      label: 'Perfect Game',
      value: 'perfectGame',
      cost: '2.00'
    },
    {
      label: 'Most Doubles Cass Fundraiser',
      value: 'mostDoubles',
      cost: '5.00'
    }
  ];

  constructor() { }

  ngOnInit() { }
}
