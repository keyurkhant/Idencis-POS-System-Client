import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'projects/shared-lib/validators/common.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  isPasswordAuthenticated: boolean = false;  // Called from service
  passwordNotMatched:boolean = false;
  @Input() close: any;
  @Input() dismiss: any;

  changePasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setChangePasswordForm();
  }

  setChangePasswordForm(){
    this.changePasswordForm = this.formBuilder.group({
      oldPassword : [null, Validators.required],
      newPassword : [null, Validators.compose([Validators.required, CustomValidator.PasswordStrengthValidator])],
      confirmPassword : [null, Validators.compose([Validators.required, CustomValidator.PasswordStrengthValidator])],
    });
  }

  changePassword(){
    if(this.isPasswordAuthenticated){
      // Set new password using API-Service call
      console.log("Password updated successfully");    
    }
    else{   
      this.passwordNotMatched = true;   
    }
  }

}
