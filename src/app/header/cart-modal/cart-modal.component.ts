import { Component, OnInit, ViewChild } from '@angular/core';
import { Game } from 'app/shared/game.model';
import { CartService } from 'app/shared/cart.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'app/shared/api.service';
import { AuthService } from 'app/shared/auth.service';
import { User } from 'app/shared/user.model';
import { UserGame } from 'app/shared/userGame.model';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})

export class CartModalComponent implements OnInit {
  @ViewChild('CartModal') CartModal: ModalDirective;
  products: Game[] = [];
  sum = 0;
  paid: boolean = false;
  codes: String[] = [];
  currentUser: User;

  constructor(private cart: CartService, private api: ApiService, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void { }

  show() {
    this.paid = false;
    this.CartModal.show();
    this.products = this.cart.getG();
    if (this.products.length > 0) {
      this.sum = this.products.map(a => a.price * (100 - a.sale) / 100).reduce((a, b) => {
        return a + b;
      });
    }
    else {
      this.sum = 0;
    }

  }

  delete(id: number, price: number) {
    const index = this.products.findIndex(x => x.id == id);
    this.products.splice(index, 1);
    this.cart.removeG(id);
    this.sum = this.sum - price;
  }

  removeAll() {
    this.products = [];
    this.cart.resetG();
    this.sum = 0;
  }

  makeGameKey() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    text += '-'
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    text += '-'
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  checkout() {
    this.paid = true;
    for (let i = 0; i < this.products.length; i++) {
      this.codes.push(this.makeGameKey());
      const saleToUpload = new UserGame({
        email: this.currentUser.email,
        name: this.products[i].name + " (" + this.products[i].platform + ")",
        price: (this.products[i].price*(100-this.products[i].sale)/100),
        gameKey: this.codes[i],
        date: (new Date()).toLocaleDateString(),
        userId: this.currentUser.id,
        gameId: this.products[i].id
      });
      this.api.addUserGame(saleToUpload).subscribe(() => {
      },
        (error: Error) => {
          console.log('err', error);
        });
    }
    this.cart.resetG();
  }

}
