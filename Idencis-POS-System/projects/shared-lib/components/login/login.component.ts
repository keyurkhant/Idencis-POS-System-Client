import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'projects/shared-lib/services/authentication.service';
import { LocalStorage } from 'projects/shared-lib/utility/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isServerError:boolean = false;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private localStorage: LocalStorage,
    private router:Router) { }

  ngOnInit(): void {
    this.setLoginForm();
  }

  setLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    
    this.authenticationService.userLogin(this.loginForm.value).subscribe({
      next: (data: any) => {
        let tokenData = data;
        this.authenticationService.getUserDataByToken(tokenData.access).subscribe((result)=>{
          let userData = result.data[0];
          userData['token'] = tokenData.access;          
          this.authenticationService.setLocalStorage(userData);
          this.authenticationService.updateUserDataLocally();          
          const routingURL = this.authenticationService.getLandingPage(userData.userRole);
          this.router.navigate([routingURL]);
        });
      },
      error: (error:any) => {
        this.isServerError = true;
        this.loginForm.controls['username'].clearValidators();
        this.loginForm.controls['username'].setValue('');
        this.loginForm.controls['password'].clearValidators();
        this.loginForm.controls['password'].setValue('');
      }
    });    
  }
}
