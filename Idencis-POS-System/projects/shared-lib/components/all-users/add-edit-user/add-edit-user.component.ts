import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'projects/shared-lib/services/user.service';
import { CommonService } from 'projects/shared-lib/utility/common.service';
import { CustomValidator } from 'projects/shared-lib/validators/common.validator';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  isViewMode: boolean = false;
  isEditMode: boolean = false
  isAddMode: boolean = false;
  username: any;
  alreadyExistUserData: any;
  userProfileForm!: FormGroup;
  isDisabled: boolean = false;
  emailAlreadyExist: boolean = false;
  usernameAlreadyExist: boolean = false;
  phoneAlreadyExist: boolean = false;
  serverError: boolean = false;

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    if (this.router.url.includes('user-details')) {
      this.isViewMode = true;
      if (this.activeRoute.snapshot.paramMap.get('username') != null) {
        this.username = this.activeRoute.snapshot.paramMap.get('username');
        this.setAlreadyExistUserProfile(this.username);
      }
    }
    else if (this.router.url.includes('add-user')) {
      this.isAddMode = true;
      this.setUserProfileForm(this.alreadyExistUserData);
    }
  }

  setUserProfileForm(userData: any) {
    this.userProfileForm = this.formBuilder.group({
      username: [{ value: userData?.username, disabled: this.isDisabled }, Validators.required],
      email: [{ value: userData?.email, disabled: this.isDisabled }, Validators.compose([Validators.required, CustomValidator.EmailValidator])],
      first_name: [{ value: userData?.first_name, disabled: this.isDisabled }, Validators.required],
      last_name: [{ value: userData?.last_name, disabled: this.isDisabled }, Validators.required],
      phone: [{ value: userData?.phone, disabled: this.isDisabled }, Validators.compose([Validators.required, CustomValidator.PhoneNumberValidator])],
      gender: [{ value: userData?.gender, disabled: this.isDisabled }, Validators.required],
      userRole: [{ value: userData?.userRole, disabled: this.isDisabled }, Validators.required],
      restaurantName: [{ value: userData?.restaurants?.name, disabled: this.isDisabled }]
    });
  }

  roleValueChanged() {
    if (this.userProfileForm.controls.userRole.value == 'manager' || this.userProfileForm.controls.userRole.value == 'staff') {
      this.userProfileForm.controls.restaurantName.setValidators(Validators.required);
      this.userProfileForm.controls.restaurantName.updateValueAndValidity();

    }
    else {
      this.userProfileForm.controls.restaurantName.clearValidators();
      this.userProfileForm.controls.restaurantName.updateValueAndValidity();
    }
  }

  setAlreadyExistUserProfile(username: any): any {
    let token = this.commonService.getCurrentUser().token;
    this.userService.getUserDataByUsername(username, token).subscribe({
      next: (data: any) => {
        this.alreadyExistUserData = data.data[0];
        this.isDisabled = true;
        this.setUserProfileForm(this.alreadyExistUserData);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  changeMode() {
    console.log(this.isEditMode);
    
    if (this.isEditMode) {
      this.saveUpdatedDetails();
    }
    else {
      this.isEditMode = true;
      this.enableProfileForm();
    }
  }

  saveUpdatedDetails() {    
    console.log(this.userProfileForm);
    let userData = this.userProfileForm.value;
    delete userData['restaurantName'];
    let token = this.commonService.getCurrentUser().token;
    this.userService.updateUserDetails(userData, token).subscribe({
      next: (data:any) =>{
        console.log(data);        
      },
      error: (error:any) =>{
        console.log(error);        
      }
    })
    this.isEditMode = false;
    this.disableProfileForm();
  }

  enableProfileForm() {
    this.userProfileForm.controls['username'].enable();
    this.userProfileForm.controls['email'].enable();
    this.userProfileForm.controls['first_name'].enable();
    this.userProfileForm.controls['last_name'].enable();
    this.userProfileForm.controls['gender'].enable();
    this.userProfileForm.controls['phone'].enable();
    this.userProfileForm.controls['userRole'].enable();
    // this.userProfileForm.controls['restaurantName'].enable();
  }

  disableProfileForm() {
    this.userProfileForm.controls['username'].disable();
    this.userProfileForm.controls['email'].disable();
    this.userProfileForm.controls['first_name'].disable();
    this.userProfileForm.controls['last_name'].disable();
    this.userProfileForm.controls['gender'].disable();
    this.userProfileForm.controls['phone'].disable();
    this.userProfileForm.controls['userRole'].disable();
    // this.userProfileForm.controls['restaurantName'].disable();
  }

  addUser() {
    this.userProfileForm.markAllAsTouched();
    this.emailAlreadyExist = false;
    this.usernameAlreadyExist = false;
    this.phoneAlreadyExist = false;
    this.serverError = false;

    if (this.userProfileForm.invalid) {
      return;
    }

    let token = this.commonService.getCurrentUser().token;
    this.userService.addNewUser(this.userProfileForm.value, token).subscribe({
      next: (data: any) => {
        // Here, have to add Notification for user added successfully
        this.router.navigate(['/users']);
      },
      error: (error: any) => {
        let err = error.error.message;
        if (err == 'Email Id is already taken.') {
          this.emailAlreadyExist = true;
        }
        else if (err == 'Username is already taken.') {
          this.usernameAlreadyExist = true;
        }
        else if (err == 'Phone number is already taken.') {
          this.phoneAlreadyExist = true;
        }
        else {
          this.serverError = true;
        }
      }
    });
  }

}
