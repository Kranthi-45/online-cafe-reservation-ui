import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../interfaces/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8082/api/reservations'; // Adjust the URL accordingly

  constructor(private http: HttpClient) { }

  getAllReservations(){
    return this.http.get(`${this.baseUrl}`);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/${id}`);
  }
  
  getReservationsByUserId(userId: number){
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }
  createReservation(reservation:any) {
    return this.http.post(`${this.baseUrl}`, reservation);
  }

  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/${id}`, reservation);
  }

  confirmBooking(id: number){
    return this.http.put(`${this.baseUrl}/confirm/${id}`, {});
  }  

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
