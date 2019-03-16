import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.less']
})
export class PriceRangeComponent implements OnInit, OnChanges {
  @Input() min:number;
  @Input() max:number;
  @Output() maxUpdated = new EventEmitter();

  maxOp:any;
  slider: any;
  constructor() { }

  ngOnInit() {
    this.slider = document.getElementById("myRange");
    let self =  this;
    this.slider.oninput = function() {
      self.setMax();
    }
  }

  ngOnChanges(changes:SimpleChanges){
    let max = changes.max;
    if(max && max.currentValue) {
      this.maxOp = max.currentValue+'+';
    }
  }

  setMax() {
    let currentVal = this.slider.value;
    this.maxOp = currentVal + (currentVal === this.slider.max ? '+': '');
  }

  updateSlider(){
    this.maxUpdated.emit(this.slider.value);
  }


}
