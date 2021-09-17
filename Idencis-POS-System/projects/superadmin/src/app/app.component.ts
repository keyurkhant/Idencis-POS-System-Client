import { Component } from '@angular/core';
import { User } from 'projects/shared-lib/interfaces/User';
import { AuthenticationService } from 'projects/shared-lib/services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  isAuthenticated:any;

  constructor(private authenticationService: AuthenticationService){
    this.authenticationService.currentUser.subscribe((data)=>{
      this.isAuthenticated = data;
    });
  }
}
