import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/shared/api.service';
import { AuthService } from 'app/shared/auth.service';
import { User } from 'app/shared/user.model';
import { UserGame } from 'app/shared/userGame.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  codes: UserGame[] = []
  searchCodes: string;
  editPasswordForm: FormGroup;
  loggedOnUser: User;

  constructor(private api: ApiService, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loggedOnUser = this.authService.currentUserValue
    this.initializeForm(this.loggedOnUser);
    this.getSales();
  }

  getSales() {
    this.api.getUserGamesByEmail(this.loggedOnUser.email)
      .subscribe((data: UserGame[]) => {
        this.codes = data;
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  initializeForm(currentUser: User) {
    this.editPasswordForm = this.fb.group({
      password: [null, Validators.required],
      rpassword: [null, Validators.required]
    });
  }

  editPassword() {
    const editedPassword = new User({
      id: this.loggedOnUser.id,
      email: this.editPasswordForm.value.email,
      password: this.editPasswordForm.value.password,
      state: this.loggedOnUser.state,
    });

    this.api.editUser(editedPassword)
      .subscribe(() => {
        this.initializeForm(this.loggedOnUser);
      },
        (error: Error) => {
          console.log('err', error);
        });
  }


}
