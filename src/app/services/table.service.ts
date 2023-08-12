import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TableService {

  private baseUrl = 'http://localhost:8082/api'; 

  constructor(private http: HttpClient) {}


  getTablesById(tableId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/tables/${tableId}`);
  }
  getTablesByType(tableType: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tables/${tableType}`);
  }

  getReservedTables(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tables/reserved`);
  }

  getAllTables(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tables/all`);
  }

  reserveTable(tableId: number){
    return this.http.post(`${this.baseUrl}/tables/reserve/${tableId}`, {});
  }
}
