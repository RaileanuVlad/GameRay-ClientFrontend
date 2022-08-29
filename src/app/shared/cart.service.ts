
import {Injectable} from '@angular/core';
import {Game} from './game.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  games: Game[] =[];

  constructor() {

  }

  resetG() {
    localStorage.removeItem('cartedGames');
  }

  addG(game: Game){
    this.games = JSON.parse(localStorage.getItem('cartedGames'));
    if(this.games===null)
    {
      this.games = [];
    }
    this.games.push(game);
    localStorage.setItem('cartedGames', JSON.stringify(this.games));
  }

  getG() {
    this.games = JSON.parse(localStorage.getItem('cartedGames'));
    if(this.games===null)
    {
      this.games = [];
    }
    return this.games;
  }

  removeG(id: number) {
    this.games = JSON.parse(localStorage.getItem('cartedGames'));
    const index = this.games.findIndex(x => x.id == id);
    this.games.splice(index, 1);
    localStorage.setItem('cartedGames', JSON.stringify(this.games));
  }


}
