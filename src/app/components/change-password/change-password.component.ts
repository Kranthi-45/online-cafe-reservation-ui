import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userId: number = 0;
  currentPassword: string = '';
  newPassword: string = '';
  message: string = '';
  errorMessage: string = '';


  constructor(private us: UserService) { }

  ngOnInit(): void {

  }

  verifyCurrentPassword(userId: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.us.getUserById(userId).subscribe((data: any) => {
        console.log(data);
        if (data.password === this.currentPassword) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, error => {
        resolve(false);
      });
    });
  }
  
  async changePassword() {
    this.message = '';
    this.errorMessage = '';
    try {
      var currentPwdCheck = await this.verifyCurrentPassword(this.userId);
      if (currentPwdCheck) {
        const user: User = {
          userId: this.userId,
          password: this.newPassword
        };
        this.us.modifyUser(user).subscribe(data => {
          console.log(data);
          this.message = "Password Changed Successfully";
        }, error => {
          this.errorMessage = "Something went wrong.. pleas try again";
        });
      } else {
        this.errorMessage = "Current password is incorrect, please enter valid data"; // Handle error messages
      }
    } catch (error) {
      this.errorMessage = "Something went wrong..";
    }
  }  
}
