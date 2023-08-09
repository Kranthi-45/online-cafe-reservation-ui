import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-complete-menu',
  templateUrl: './complete-menu.component.html',
  styleUrls: ['./complete-menu.component.css']
})
export class CompleteMenuComponent implements OnInit {

  menus:any;
  constructor( private ms: MenuService) { }

  ngOnInit(): void {
    this.fngetAllMenus();
  }
  fngetAllMenus() {
    this.ms.getAllMenu().subscribe(
      (data:any) => {
        console.log(data);
        this.menus = data?.items;
      }, (error) => {
        console.log(error);
      }
    )
  }
}
