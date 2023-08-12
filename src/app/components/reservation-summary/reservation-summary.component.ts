import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent implements OnInit {

  reservation:any
  constructor() { }

  ngOnInit(): void {
   const summary = localStorage.getItem("summary");
   if(summary){
    this.reservation = JSON.parse(summary);
   }
  }
}
