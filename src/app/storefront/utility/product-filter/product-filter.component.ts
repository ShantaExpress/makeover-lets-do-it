import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.less']
})
export class ProductFilterComponent implements OnInit {

  min:any = 0;
  max:any = 25000;
  updatedMaxPrice:any = 25000;
  filterList: any = {};
  @Input() products:any = [];
  @Output() setMaxPrice:any = new EventEmitter();

  maxUpdated(max:number){
    console.log('updated max = ', max);
    this.updatedMaxPrice = max;
    this.setMaxPrice.emit(max);
  }
  constructor() { }

  ngOnInit() {
    console.log('products : ', this.products);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes: ', changes.products.currentValue);
    if(changes.products.currentValue) {
      this.setFilter();
    }
  }

  setFilter() {
    this.filterList = {};
    let self = this;
    this.products.forEach(product=>{
      product.specification.forEach(spec=>{
        spec.list.forEach(property=>{
          if(self.filterList[property.prop] && self.filterList[property.prop].indexOf(property.propValue) == -1){
            if(property.propValue.indexOf(',')>=0) {
              self.filterList[property.prop].push(
                ...(property.propValue.split(',').filter(item=>{
                  return self.filterList[property.prop].indexOf(item) == -1;
                })
                )
              );
            } else {
              self.filterList[property.prop].push(property.propValue);
            }
          } else {
            self.filterList[property.prop] = [property.propValue];
          }
        });
      });
    });
    console.log(this.filterList);
  }

  get filterKeys() {
    return Object.keys(this.filterList);
  }
}
