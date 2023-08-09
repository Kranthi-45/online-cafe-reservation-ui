import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddMenu } from 'src/app/interfaces/add-menu.model';
import { EditMenu } from 'src/app/interfaces/edit-menu.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-complete-menu',
  templateUrl: './complete-menu.component.html',
  styleUrls: ['./complete-menu.component.css']
})
export class CompleteMenuComponent implements OnInit {
  breadcrumb = ['Home', 'Complete Menu'];
  menus:any;
  status:Boolean=false;
  statusMessage:String = "";
  editMenuForm:any;
  enableId =true;
  isChecked = true; // Set the initial value
  constructor(private fb:FormBuilder, private ms: MenuService) {
    this.editMenuForm=this.fb.group({
      itemId:['',[Validators.required]],
      itemName:['',[Validators.required]],
      description:['',[Validators.required]],
      price:['',[Validators.required]],
      type:['',[Validators.required]]
    });
   }
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

  fnUpdateMenu(item:any){
    console.log("patch value", item)
    this.editMenuForm.patchValue(item);
  }

  fnSaveMenu(){
    const newMenuItem: EditMenu = {
      itemId: this.editMenuForm.controls['itemId'].value,
      itemName: this.editMenuForm.controls['itemName'].value,
      description: this.editMenuForm.controls['description'].value,
      price: this.editMenuForm.controls['price'].value,
      availability: true,                                   // You can set the availability here
      type: this.editMenuForm.controls['type'].value,
      enable: true
    };
    this.ms.modifyMenu(newMenuItem,).subscribe(
      (data:any) => {
        this.statusMessage = data?.message;
        this.status = true;
        this.editMenuForm.reset();
        console.log('Menu Updated successfully:', data);
        this.fngetAllMenus();
      },
      (error) => {
        this.statusMessage = error?.message;
        console.error('Error Updating Menu:', error);
      });
  }

  fnDelete(item:any) {
    this.ms.removeMenu(item.itemId).subscribe(
      (data:any) => {
        this.statusMessage = data?.message;
        this.status = true;
        console.log('Menu Deleted successfully:', data);
        this.fngetAllMenus();
      },
      (error) => {
        this.statusMessage = error?.message;
        console.error('Error Deleting menu:', error);
      });
  }

  fnEnabled(isChecked: boolean, item:any){
    console.log("ischecked", isChecked);
    const newMenuItem: EditMenu = {
      itemId: item.itemId,
      itemName: item.itemName,
      description: item.description,
      price: item.price,
      availability: true,                                   // You can set the availability here
      type: item.type,
      enable: isChecked
    };

    this.ms.modifyMenu(newMenuItem).subscribe(
      (data:any) => {
        this.statusMessage = isChecked ? "Enabled Successfully" : "Disabled Successfully";
        this.status = true;
        console.log('Menu Updated successfully:', data);
        // this.fngetAllMenus();
      },
      (error) => {
        this.statusMessage = error?.message;
        console.error('Error Updating Menu:', error);
      });
  }
}
