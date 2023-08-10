import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url:string='http://localhost:8082/api/items';
  
  constructor(private http:HttpClient) { }
  addMenu(menu:any)
  {
    return this.http.post(this.url,menu);
  }
  getAllMenu(){
    return this.http.get(this.url);
  }
  modifyMenu(menu:any)
  {
    return this.http.put(this.url+"/"+menu.itemId,menu);
  }
  removeMenu(id:any)
  {
    return this.http.delete(this.url+"/"+id);
  }
  findMenuById(id:any){
    return this.http.get(this.url+"/"+id);
  }
  
}
