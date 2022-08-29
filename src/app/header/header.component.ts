import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth.service';
import { CartService } from 'app/shared/cart.service';
import { User } from 'app/shared/user.model';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  @ViewChild('CartModal') CartModal: CartModalComponent;
  @ViewChild('LoginModal') LoginModal: LoginModalComponent;
  @ViewChild('RegisterModal') RegisterModal: RegisterModalComponent;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cart: CartService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() { }

  logout() {
    this.cart.resetG();
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  openCart() {
    this.CartModal.show();
  }

  openLogin() {
    this.LoginModal.show();
  }

  openRegister() {
    this.RegisterModal.show();
  }

}


