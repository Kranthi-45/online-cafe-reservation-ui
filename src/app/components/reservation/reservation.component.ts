import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/interfaces/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservationForm!: FormGroup;
  userId:any;
  isLoggedInUser = false;
  reservedTable:any;
  constructor(
    private formBuilder: FormBuilder,
    private rs: ReservationService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.reservationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      numberOfPeople: [, Validators.required],
      customMessage: [''],
    });
  }

  submitReservation() {
    const userJson = localStorage?.getItem('user');
    if (userJson) {
      this.isLoggedInUser = JSON.parse(userJson).userId ? JSON.parse(userJson).userId : "";
    }
    if (this.isLoggedInUser) {
      this.userId = this.isLoggedInUser;
    } 

    const isreservedTable = localStorage?.getItem('table');
    if (isreservedTable) {
      this.reservedTable = JSON.parse(isreservedTable).table.id ;
    }
    
    // Get the current date
    const currentDate = new Date();
    const year = currentDate.getFullYear();   
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedCreatedDate = `${year}-${month}-${day}`;
 
    if (this.reservationForm.valid) {
      // const reservationData = this.reservationForm.value;
      const reservationData: Reservation = {
        name: this.reservationForm.controls['name'].value,
        email: this.reservationForm.controls['email'].value,
        phone: this.reservationForm.controls['phone'].value,
        date: this.reservationForm.controls['date'].value,
        time: this.reservationForm.controls['time'].value,
        numberOfPeople: this.reservationForm.controls['numberOfPeople'].value,
        customMessage: this.reservationForm.controls['customMessage'].value,
        user:{
          userId: this.isLoggedInUser ? +this.isLoggedInUser : this.userId,
        },
        table:{
          id: this.reservedTable,
        },
        createdDate:formattedCreatedDate,
        status:"Booking pending"
        // role: this.signupForm.controls['role'].value,
      };
      this.rs.createReservation(reservationData).subscribe(
        (response : any) => {
          localStorage.setItem("summary",JSON.stringify(response));
          console.log('Reservation success:', response);
          this.router.navigate(['/summary']);

          // Handle successful reservation here
        },
        (error : any) => {
          console.error('Reservation error:', error);
          // Handle reservation error here
        }
      );
    }
  }

}
