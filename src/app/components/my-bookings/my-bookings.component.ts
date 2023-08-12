import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  reservations: any;
  isLoggedInUser: any;
  userId:any;
  constructor(private rs: ReservationService) { }

  ngOnInit(): void {
    this.getReservationsByUserId();
  }

  getReservationsByUserId(): void {
    const userJson = localStorage?.getItem('user');
    if (userJson) {
      this.isLoggedInUser = JSON.parse(userJson).userId ? JSON.parse(userJson).userId : "";
    }
    if (this.isLoggedInUser) {
      this.userId = this.isLoggedInUser;
    } 
    this.rs.getReservationsByUserId(this.userId)
      .subscribe(reservations => {
        this.reservations = reservations;
        console.log("reservations by userid",this.reservations)
      });
  }
}
