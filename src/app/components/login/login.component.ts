import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  users: any;
  admin: any;
  role: any;
  statusCred = false;
  statusExistUser = false;
  username: string = '';
  password: string = '';
  // userstatus:any;
  constructor(private fb: FormBuilder, private us: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      admin: [],
      role: []
    });

  }
  signStatus: any;
  ngOnInit(): void {
    // this.us.getAllUsers().subscribe((data) => {
    //   console.log(data);
    //   this.users = data;
    // });
  }

  onLoginClick(): void {
    var role = "user";
    this.username = this.loginForm.controls['username'].value;
    this.password = this.loginForm.controls['password'].value;
    this.us.login(this.username, this.password).subscribe(
      (data: any) => {
        // Handle successful login
        console.log('User logged in:', data);
        if (data != null) {
          var user: any;
          var role: any;
          user = data;
          if (user.userId != null) {
            this.statusExistUser = false;
            this.statusCred = false;
            localStorage.setItem("user", JSON.stringify(user));
            this.us.loginStatus().subscribe();
            var role1 = localStorage.getItem('user');
            if (role1) {
              role = JSON.parse(role1);
            }
            if (role.role == "user") {
              console.log("user loggedin")
              localStorage.setItem("user",JSON.stringify(user));
              this.router.navigate(['/user/dashboard']);
            }
            else {
              console.log("admin loggedin")
              this.router.navigate(['/admin/dashboard']);
            }
          } else {
            this.statusCred = true;
            this.statusExistUser = false;
          }
        } else {
          //localStorage.setItem("user", JSON.stringify(null));
          // this.statusExistUser = true;
          this.statusCred = true;
        }
      },
      (error) => {
        // Handle login error
        // this.statusExistUser = true;
        this.statusCred = true;
        console.error('Login failed:', error);
      }
    );

  }
}
