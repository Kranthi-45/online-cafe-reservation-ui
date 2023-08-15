import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {


  constructor(private ms: MenuService) { }
  menus: any;
  backUpMenus: any
  notFoundMssg : any
  buttonLabels: string[] = ['Show All', 'Breakfast', 'Lunch', 'Dinner', 'Desert'];
  selectedButtonIndex: number | null = 0;

  selectButton(index: number): void {
    this.selectedButtonIndex = index;
    let tabType: string;
    switch (index) {
      case 0:
        tabType = 'all';
        break;
      case 1:
        tabType = 'BREAK_FAST';
        break;
      case 2:
        tabType = 'lunch';
        break;
      case 3:
        tabType = 'dinner';
        break;
      case 4:
        tabType = 'dessert';
        break;
      default:
        tabType = 'all'; // Default to 'Show All'
    }
    if (tabType !== "all") {
      this.ms.getMenusByType(tabType).subscribe((data: any) => {
        // Process the retrieved items
        this.menus = data.items;
        console.log('Menu items for tab type:', tabType, data);
        if(data.items.length < 1){
          this.notFoundMssg =  "Oops! Items Not Found ";
        }else{
          this.notFoundMssg = "";
        }
      });
    } else {
      this.menus = this.backUpMenus;
    }
  }

  ngOnInit(): void {
    this.fngetAllMenus();
  }

  fngetAllMenus() {
    this.ms.getAllMenu().subscribe(
      (data: any) => {
        console.log(data);
        this.menus = data?.items;
        this.backUpMenus = data?.items;
      }, (error) => {
        console.log(error);
      }
    )
  }
}
