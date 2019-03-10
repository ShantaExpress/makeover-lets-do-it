import { Component, OnInit } from '@angular/core';
import {GridDataType} from '../../../models/grid.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-specification-list',
  templateUrl: './product-specification-list.component.html',
  styleUrls: ['./product-specification-list.component.less']
})
export class ProductSpecificationListComponent implements OnInit {
  CRUDSuccess:String = '';
  error:String='';
  configuration:GridDataType[]=[
    {field:'name',display:'Product Specification Name', visible:true,editable:true},
    {field:'identifier',display:'Identifier', visible:true,editable:true},
    {field:'sectionalCategory_id',display:'Sectional-Category',
    visible:true,editable:false,parentApi:'sectionalCategory',parentField:'name'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
