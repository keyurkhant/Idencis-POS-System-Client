import { Component, OnInit } from '@angular/core';
import { User } from 'projects/shared-lib/interfaces/User';
import { AuthenticationService } from 'projects/shared-lib/services/authentication.service';
import { CommonService } from 'projects/shared-lib/utility/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userData:User | undefined;

  constructor(private authenticationService: AuthenticationService,
    private commonService : CommonService) { }

  ngOnInit(): void {
    this.userData = this.commonService.getCurrentUser();
  }

  logout(){
    this.authenticationService.userLogout();
  }
}
