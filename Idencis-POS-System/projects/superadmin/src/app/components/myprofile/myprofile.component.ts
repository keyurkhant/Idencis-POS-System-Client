import { APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from 'projects/shared-lib/components/change-password/change-password.component';
import { User } from 'projects/shared-lib/interfaces/User';
import { CustomValidator } from 'projects/shared-lib/validators/common.validator';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  superAdminFlag: boolean = false;
  profileForm!: FormGroup;
  isDisabled: boolean = true;
  isEditMode: boolean = false;
  userData: User | undefined = {
    "username": "keyur",
    "email": "kp@gmail.com",
    "first_name": "keyur",
    "last_name" : "khant",
    "phone" : "9016243435",
    "userRole" : "admin",
    "gender" : "Male",
    "last_login" : "12 November 2021 12:00 AM"
  };

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.setProfileForm(this.userData);
  }

  setProfileForm(userData: User | undefined) {
    let isCustomer: Boolean = false;
    let isManager: Boolean = false;
    let isAdmin: Boolean = false;
    let isSuperAdmin: Boolean = false;    
    if(userData?.userRole == 'superadmin'){
      isCustomer = true;
      isManager = true;
      isAdmin = true;
      isSuperAdmin = true;
      this.superAdminFlag = true;
    }
    else if(userData?.userRole == 'admin'){
      isCustomer = true;
      isManager = true;
      isAdmin = true;
    }
    else if(userData?.userRole == 'manager'){
      isCustomer = true;
      isManager = true;
    }
    else if(userData?.userRole == 'customer'){
      isCustomer = true;
    }

    this.profileForm = this.formBuilder.group({
      username: [{value: userData?.username, disabled: this.isDisabled}, Validators.required],
      email: [{value: userData?.email, disabled: this.isDisabled}, Validators.compose([Validators.required, CustomValidator.EmailValidator])],
      firstname: [{value: userData?.first_name, disabled: this.isDisabled}, Validators.required],
      lastname: [{value: userData?.last_name, disabled: this.isDisabled}, Validators.required],
      phone: [{value: userData?.phone, disabled: this.isDisabled}, Validators.compose([Validators.required, CustomValidator.PhoneNumberValidator])],
      gender: [{value: userData?.gender, disabled: this.isDisabled}, Validators.required],
      customer: [{value: isCustomer, disabled: this.isDisabled}, Validators.required],
      manager: [{value: isManager, disabled: this.isDisabled}, Validators.required],
      admin: [{value: isAdmin, disabled: this.isDisabled}, Validators.required],
      superadmin: [{value: isSuperAdmin, disabled: this.isDisabled}, Validators.required],
    });
  }

  getUserData(){

  }

  changeMode(event:any){
    if(this.isEditMode){
      this.saveDetails();
    }
    else{
      this.isEditMode = true;
      this.enableProfileForm();

    }
  }

  saveDetails(){
    this.isEditMode = false;   
    this.disableProfileForm();
  }

  enableProfileForm(){
    this.profileForm.controls['username'].enable();
    this.profileForm.controls['email'].enable();
    this.profileForm.controls['firstname'].enable();
    this.profileForm.controls['lastname'].enable();
    this.profileForm.controls['gender'].enable();
    this.profileForm.controls['phone'].enable();
  }

  disableProfileForm(){
    this.profileForm.controls['username'].disable();
    this.profileForm.controls['email'].disable();
    this.profileForm.controls['firstname'].disable();
    this.profileForm.controls['lastname'].disable();
    this.profileForm.controls['gender'].disable();
    this.profileForm.controls['phone'].disable();
  }

  openChangePassword(changePasswordModal:any){
    this.modalService.open(changePasswordModal, {centered: true});
  }
} 
