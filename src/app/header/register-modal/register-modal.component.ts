import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {
  @ViewChild('RegisterModal') RegisterModal: ModalDirective;
  addUserForm: FormGroup;
  registerInvalid = false;
  registerMessage: Error;
  aux: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  show() {
    this.registerInvalid = false;
    this.aux = false;
    this.RegisterModal.show();
    this.addUserForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      rpassword: [null, Validators.required],
      state: [0, Validators.required],
    });

    
  }

 


  addUser() {
    this.registerInvalid = false;

    this.addUserForm.value.state = Number(this.addUserForm.value.state)
    this.api.addUser(this.addUserForm.value).subscribe(() => {
      this.aux = true;
    },
      (error: Error) => {
        console.log('err', error);
        this.registerMessage = error;
        this.registerInvalid = true;
      });

  }

  sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


}
  