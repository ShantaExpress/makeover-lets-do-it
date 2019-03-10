import { Component, OnInit, Input, Output, Directive,ElementRef,Renderer,ViewChild,EventEmitter } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-features',
  templateUrl: './product-features.component.html',
  styleUrls: ['./product-features.component.less']
})
export class ProductFeaturesComponent implements OnInit {
  @Input() specifications:any = [];
  @Output() emitFeatures: EventEmitter<any> = new EventEmitter<any>();
  newSpecification:any = '';
  constructor() { }

  ngOnInit() {
  }

  
  addNewSpecification(newSpecification){
    if(newSpecification.trim().length){
      this.specifications.push({name:newSpecification.trim(),list:[],specProp:'',specPropValue:'',showInHighlight:''});
      this.newSpecification = '';
      this.emitFeatures.emit(this.specifications);
    }
  }
  deleteSpecification(index){
    this.specifications.splice(index,1);
    this.emitFeatures.emit(this.specifications);
  }
  
  addNewSpecificationProperty(spec){
    if(spec.specProp && spec.specProp.trim().length && spec.specPropValue && spec.specPropValue.trim().length){
      if(spec.list.length==0){
        spec.list.push({
          prop:spec.specProp.trim(),
          propValue:spec.specPropValue.trim(),
          highlight: spec.showInHighlight
        });
        spec.specProp = spec.specPropValue = '';
      } else {
        var props = spec.list.map(prop=>{
          return prop.prop;
        });
        if(props.indexOf(spec.specProp)==-1){
          spec.list.push({
            prop:spec.specProp.trim(),
            propValue:spec.specPropValue.trim(),
            highlight: spec.showInHighlight
          });
          spec.specProp = spec.specPropValue = '';
        }
      }
    }
    this.emitFeatures.emit(this.specifications);
  }

  deleteSpecificationProperty(list,index){
    list.splice(index,1);
    this.emitFeatures.emit(this.specifications);
  }

}
