import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.less']
})
export class ProductFilterComponent implements OnInit {

  min:any = 0;
  max:any = 25000;
  updatedMaxPrice:any = 25000;
  maxUpdated(max:number){
    console.log('updated max = ', max);
    this.updatedMaxPrice = max;
  }
  constructor() { }

  ngOnInit() {
  }

}
