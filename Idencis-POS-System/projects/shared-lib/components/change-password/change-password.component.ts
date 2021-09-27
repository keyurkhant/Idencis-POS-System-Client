import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'projects/shared-lib/services/authentication.service';
import { CommonService } from 'projects/shared-lib/utility/common.service';
import { CustomValidator } from 'projects/shared-lib/validators/common.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @Input() close: any;
  @Input() dismiss: any;
  @Output() isPasswordChanged = new EventEmitter<boolean>();

  changePasswordForm!: FormGroup;
  serverError:any;
  serverMessage:any;
  isServerError:boolean = false;  

  constructor(private formBuilder: FormBuilder,
    private commonService : CommonService,
    private authenticationService : AuthenticationService) { }

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
    this.changePasswordForm.markAllAsTouched();
    if(this.changePasswordForm.invalid){
      return;
    }    
    let token = this.commonService.getCurrentUser().token;
    this.authenticationService.changePassoword(this.changePasswordForm.value, token).subscribe({
      next: (data:any)=>{        
        this.serverMessage = data.message;      
        if(data.code = 200){        
          this.isPasswordChanged.emit(true);
        }
      },
      error :(error:any)=>{
        this.isServerError = true;
        this.serverError = error.error.message;
      }
    });
  }  

}
