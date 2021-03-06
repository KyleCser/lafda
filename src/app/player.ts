import {SideGame} from './side-game';

export interface Player {
  number?: number;
  id?: string;
  name: string;
  division: string;
  sideGames: SideGame[];
  totalCost?: number;
  edit?: boolean;
  addToBottom?: boolean;
}
