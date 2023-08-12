import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  status: string = "login";
  role: any;
  statussignup: any;
  signupnave: any;
  userName: any;
  constructor(private us: UserService) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {                                                                                     // console.log("ngDoCheck started");
    this.us.loginStatus().subscribe((data) => {
      // console.log(data);
      if (data == null)
        this.status = "login";
      else {
        this.status = "logout";
      }
    });

    var role1 = localStorage.getItem('user');
    if (localStorage.getItem('user') == null) {
      this.signupnave = true;
    } else {
      this.signupnave = false;
    }

    var roleName : any;
    var role1 = localStorage.getItem("user") != "null" ? localStorage.getItem("user") : "";
    if (role1 != "null") {
      roleName = JSON.parse(role1 || '{}');
      this.userName = roleName.userName;
    }
  }

  loginout(status :any) {
    if(status === "logout"){
      localStorage.removeItem("user");
      this.us.loginStatus();
    }
  }
}
