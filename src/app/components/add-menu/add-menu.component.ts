import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { AddMenu } from 'src/app/interfaces/add-menu.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  addMenuForm:FormGroup;
  menu:AddMenu[] | undefined;
  status:Boolean=false;
  statusMessage:String = "";
  constructor(private fb:FormBuilder, private ms: MenuService) {
    this.addMenuForm=this.fb.group({
      menuName:['',[Validators.required]],
      menuDescription:['',[Validators.required]],
      menuPrice:['',[Validators.required]],
      menuCategory:['',[Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  fnAddMenu(){
    const newMenuItem: AddMenu = {
      itemName: this.addMenuForm.controls['menuName'].value,
      description: this.addMenuForm.controls['menuDescription'].value,
      price: this.addMenuForm.controls['menuPrice'].value,
      availability: true,                                   // You can set the availability here
      type: this.addMenuForm.controls['menuCategory'].value
    };
    this.ms.addMenu(newMenuItem).subscribe(
      (data:any) => {
        this.statusMessage = data?.message;
        this.status = true;
        this.addMenuForm.reset();
        console.log('Menu added successfully:', data);
      },
      (error) => {
        this.statusMessage = error?.message;
        console.error('Error adding menu:', error);
      });
  }
}
