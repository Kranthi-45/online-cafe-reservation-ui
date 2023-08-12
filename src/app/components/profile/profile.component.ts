import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails1: any;
  userForm: any;
  loggedUser: any;
  status = false;
  statusInfo = false;
  constructor(private us: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      userId: [''],
      userName: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      gender: ['']
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    var userDetails = localStorage.getItem("user");
    if (userDetails) {
      this.userDetails1 = JSON.parse(userDetails);
      this.loggedUser = this.userDetails1.userId;
    }
  }

  fnEdit() {
    this.us.getUserById(this.loggedUser).subscribe((data) => {
      this.status = true;
      this.statusInfo = false;
      this.userForm.patchValue(data);
      console.log(data);
    });
  }

  fnModify() {
    const user: User = {
    userId: this.userForm.controls['userId'].value,
    userName : this.userForm.controls['userName'].value,
    firstName : this.userForm.controls['firstName'].value,
    lastName : this.userForm.controls['lastName'].value,
    email : this.userForm.controls['email'].value,
    phone : this.userForm.controls['phone'].value,
    gender : this.userForm.controls['gender'].value,
    password : this.userForm.controls['password'].value,
    role : this.loggedUser.role
    }
    this.us.modifyUser(user).subscribe(data => {
      console.log(data);
      this.status = true;
      this.statusInfo = true;
      localStorage.setItem("user", JSON.stringify(user));
      this.getUser();
    }
    );
  }

}
