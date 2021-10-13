import { Component, OnInit } from '@angular/core';
import { UserService } from 'projects/shared-lib/services/user.service';
import { CommonService } from 'projects/shared-lib/utility/common.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  allUserData: any;
  searchKeyword: string = '';
  totalUsers: number = 0;
  adminUsers: number = 0;
  managerUsers: number = 0;
  staffUsers: number = 0;

  constructor(private userService: UserService,
    private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getAllUserData();
  }

  getAllUserData() {
    let token = this.commonService.getCurrentUser().token;
    this.userService.getAllUserData(token).subscribe({
      next: (data: any) => {
        this.allUserData = data.data[0];
        this.setUsersCounts(this.allUserData);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  setUsersCounts(allUserData: any) {
    this.totalUsers = allUserData.length;
    this.adminUsers = allUserData.filter((data: { userRole: string; }) => (data.userRole == 'admin' || data.userRole == 'superadmin')).length;
    this.managerUsers = allUserData.filter((data: { userRole: string; }) => data.userRole == 'manager').length;
    this.staffUsers = allUserData.filter((data: { userRole: string; }) => data.userRole == 'staff').length;
  }
}
