import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'app/shared/auth.service'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent{

  @ViewChild('LoginModal') LoginModal: ModalDirective;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private authService: AuthService) {}
  loginForm: FormGroup;
  loginInvalid = false;
  loginMessage: Error;


  show() {
    this.LoginModal.show();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loginInvalid = false;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          this.LoginModal.hide();
        },
        (error: Error) => {
          console.log('err', error);
          this.loginMessage = error;
          this.loginInvalid = true;
        });
  }



}
