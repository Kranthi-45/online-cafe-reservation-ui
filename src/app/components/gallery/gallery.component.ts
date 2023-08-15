import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  images: { path: string, title: string }[] = [
    {path:'./assets/images/image1.jpg',title: 'Breakfast'},
    {path:'./assets/images/image2.jpg',title: 'Lunch'},
    {path:'./assets/images/image3.jpeg',title: 'Dinner'},
   
];

  constructor() { }

  ngOnInit(): void {
  }

}
