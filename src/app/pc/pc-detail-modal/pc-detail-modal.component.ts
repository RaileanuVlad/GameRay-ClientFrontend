import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Game } from '../../shared/game.model';
import { ApiService } from '../../shared/api.service';
import { CartService } from '../../shared/cart.service';
import { AuthService } from 'app/shared/auth.service';
import { User } from 'app/shared/user.model';

@Component({
  selector: 'app-pc-detail-modal',
  templateUrl: './pc-detail-modal.component.html',
  styleUrls: ['./pc-detail-modal.component.css']
})
export class PcDetailModalComponent implements OnInit {
  @ViewChild('pcDetailModal') modal: ModalDirective;
  game = new Game();
  currentUser: User;
  minimum: string[];
  recommended: string[];

  constructor(private api: ApiService, private cart: CartService, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() { }

  show(id: number): void {
    this.getGame(id);
    this.modal.show();
    this.api.incrementGame(id)
      .subscribe(() => {
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  getGame(id: number) {
    this.api.getGame(id)
      .subscribe((data: Game) => {
        this.game = data;
        this.minimum = this.game.minReq.split(',');
        this.recommended = this.game.recReq.split(',');
        this.game.id = id;
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  addCart(game: Game) {
    this.cart.addG(game);
    this.modal.hide();
  }
}
