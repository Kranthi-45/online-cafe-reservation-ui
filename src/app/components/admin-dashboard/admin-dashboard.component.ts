import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  breadcrumb = ['Home', 'Dashboard'];
  reservations:any;
  reservationsLength:any
  menusLength:any
  constructor(private rs: ReservationService,private ms: MenuService) { }

  ngOnInit(): void {
    this.getAllReservations();
    this.fngetAllMenus();
  }

  getAllReservations(): void {
    this.rs.getAllReservations()
      .subscribe((data) => {
        this.reservations = data;
        this.reservationsLength = this.reservations.length;
        console.log("get all reservations",data)
      }, (error) => {
        console.error('Error fetching reservations:', error);
      });
  }
  confirmBooking(id: number) {
    this.rs.confirmBooking(id).subscribe((data) => {
      console.log('Booking confirmed:', data);
      this.getAllReservations();
    });
  }

  fngetAllMenus() {
    this.ms.getAllMenu().subscribe(
      (data: any) => {
        console.log(data);
        this.menusLength = data?.items.length;
      }, (error) => {
        console.log(error);
      }
    )
  }
}
