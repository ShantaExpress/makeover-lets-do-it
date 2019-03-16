import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'product-detailed-specification',
  templateUrl: './product-detailed-specification.component.html',
  styleUrls: ['./product-detailed-specification.component.less']
})
export class ProductDetailedSpecificationComponent implements OnInit, OnChanges {

  @Input() spefications:any = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.spefications.currentValue) {
      this.initCollapse();
    }
  }

  initCollapse () {
    for (let i = 0; i < this.spefications.length; i++) {
      this.spefications[i].visible = (i === 0);
    }
  }

  collapseShow(index:number) {
    for (let i = 0; i < this.spefications.length; i++) {
      if ( i === index ) {
        this.spefications[i].visible = !this.spefications[i].visible;
      }
    }
    console.log('inside initCollapse: ', this.spefications);

  }

}
