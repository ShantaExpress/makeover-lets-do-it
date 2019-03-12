import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-image-gallery',
  templateUrl: './product-image-gallery.component.html',
  styleUrls: ['./product-image-gallery.component.less']
})
export class ProductImageGalleryComponent implements OnInit {

  @Input() images: any;
  selectedImage: any = 0;
  constructor() { }

  ngOnInit() {
  }

  selectImage(j){
    this.selectedImage = j;
    var elmnt = document.getElementsByClassName("images-iterator")[0];
    elmnt.scrollTop = 50*j;
  }

}
