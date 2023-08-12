import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  signupForm: any;
  signStatus: any;
  users: any;
  submitted: boolean = false;
  message: string = '';
  txtOtp: string = '';
  x = true;
  signUpFormSuccess = false;
  status: Boolean = false;
  statusMessage: String = "";
  constructor(private fb: FormBuilder, private us: UserService) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      gender: [],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)]],
      cpassword: ['', [Validators.required]],
      role: ['', [Validators.required]],
      // otp: []
    },
    {
        validators: this.MustMatch('password', 'cpassword')
    }
  )}
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.MustMatch) {
        return
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }
  get f() { return this.signupForm.controls }

  ngOnInit(): void {
    this.us.getAllUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
    })
  }
  fnpasseye(event: any) {
    console.log(event)
    if (event.target.className == 'fas fa-eye') {
      event.target.className = 'fas fa-eye-slash';
      event.target.previousElementSibling.type = 'text';
    } else {
      event.target.className = 'fas fa-eye';
      event.target.previousElementSibling.type = 'password';
    }
  }

  onSignupClick(): void {
    if (this.signupForm.valid) {
      const newUser: User = {
        userName: this.signupForm.controls['userName'].value,
        firstName: this.signupForm.controls['firstName'].value,
        lastName: this.signupForm.controls['lastName'].value,
        email: this.signupForm.controls['email'].value,
        phone: this.signupForm.controls['phone'].value,
        gender: this.signupForm.controls['gender'].value,
        password: this.signupForm.controls['password'].value,
        // role: "user",
        role: this.signupForm.controls['role'].value,
      };
      console.log("registering user", newUser);
      this.us.signup(newUser).subscribe(
        (data: any) => {
          this.statusMessage = data?.message;
          this.status = true;
          this.signUpFormSuccess = true;
          this.signupForm.reset();
          console.log('User Registered successfully:', data);
        },
        (error) => {
          this.statusMessage = error?.message;
          this.signUpFormSuccess = false;
          console.error('Error :', error);
        });
    }
  }

  //   confirmedValidator(controlName: string, matchingControlName: string){
  //     return (formGroup: FormGroup) => {
  //         const control = formGroup.controls[controlName];
  //         const matchingControl = formGroup.controls[matchingControlName];
  //         if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
  //             return;
  //         }
  //         if (control.value !== matchingControl.value) {
  //             matchingControl.setErrors({ confirmedValidator: true });
  //         } else {
  //             matchingControl.setErrors(null);
  //         }
  //     }
  // }

  // fnGenerateOtp() {
  //   this.message = "OTP Sent Successfully"
  //   var email = this.signupForm.controls['email'].value;
  //   this.us.getOtp(email).subscribe((data) => {
  //     console.log(data);
  //     var otp = data.toString();
  //     localStorage.setItem("otp", otp);
  //   });
  // }

  // fnValidateOtp() {
  //   // this.txtOtp
  //   var otp = localStorage.getItem("otp");
  //   console.log(otp);
  //   console.log("txtOpt is " + this.txtOtp);
  //   if (this.txtOtp == otp) {
  //     this.x = false;
  //   } else {
  //     this.x = true;
  //   }
  // }
}
