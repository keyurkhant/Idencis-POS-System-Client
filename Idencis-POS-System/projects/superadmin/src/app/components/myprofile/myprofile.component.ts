import { APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'projects/shared-lib/interfaces/User';
import { AuthenticationService } from 'projects/shared-lib/services/authentication.service';
import { UserService } from 'projects/shared-lib/services/user.service';
import { CommonService } from 'projects/shared-lib/utility/common.service';
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
  userData: User | undefined;
  isPasswordChanged:boolean = false;
  changePasswordModalRef:NgbModalRef | undefined;
  isServerError:boolean = false;
  serverError:any;

  constructor(private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private authenticationService : AuthenticationService,
    private userService : UserService,
    private commonService : CommonService) { }

  ngOnInit(): void {
    this.userData =  this.commonService.getCurrentUser();    
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
      first_name: [{value: userData?.first_name, disabled: this.isDisabled}, Validators.required],
      last_name: [{value: userData?.last_name, disabled: this.isDisabled}, Validators.required],
      phone: [{value: userData?.phone, disabled: this.isDisabled}, Validators.compose([Validators.required, CustomValidator.PhoneNumberValidator])],
      gender: [{value: userData?.gender, disabled: this.isDisabled}, Validators.required],
      customer: [{value: isCustomer, disabled: this.isDisabled}, Validators.required],
      manager: [{value: isManager, disabled: this.isDisabled}, Validators.required],
      admin: [{value: isAdmin, disabled: this.isDisabled}, Validators.required],
      superadmin: [{value: isSuperAdmin, disabled: this.isDisabled}, Validators.required],
    });
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
    this.profileForm.markAllAsTouched();
    if(this.profileForm.invalid){            
      return;
    }    
    let token = this.commonService.getCurrentUser().token;
    this.userService.updateUserProfileDetails(this.profileForm.value, token).subscribe({
      next: (data:any) =>{
        console.log("User data updated successfully!");        
        this.isEditMode = false;   
        this.disableProfileForm();
      },
      error: (error:any)=>{
        this.isServerError = true;
        this.serverError = error.error.message;
      }
    });    
  }

  enableProfileForm(){
    this.profileForm.controls['username'].enable();
    this.profileForm.controls['email'].enable();
    this.profileForm.controls['first_name'].enable();
    this.profileForm.controls['last_name'].enable();
    this.profileForm.controls['gender'].enable();
    this.profileForm.controls['phone'].enable();
  }

  disableProfileForm(){
    this.profileForm.controls['username'].disable();
    this.profileForm.controls['email'].disable();
    this.profileForm.controls['first_name'].disable();
    this.profileForm.controls['last_name'].disable();
    this.profileForm.controls['gender'].disable();
    this.profileForm.controls['phone'].disable();
  }

  openChangePassword(changePasswordModal:any){
    this.changePasswordModalRef = this.modalService.open(changePasswordModal, {centered: true});       
  }

  passwordChanged(data:any){
    this.isPasswordChanged = data; 
    if(this.isPasswordChanged){
      this.changePasswordModalRef?.close();      
    }
  }
} 
