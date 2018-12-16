import { Component, OnInit, Directive,ElementRef,Renderer } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from '../../../services/admin-service.service';

import {GridDataType} from '../../../models/grid.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {

  configuration:GridDataType[]=[
    {field:'name',display:'Name', visible:true,editable:false},
    {field:'identifier',display:'Identifier', visible:true,editable:false},
    {field:'isEnabled',display:'Enabled', visible:true,editable:false},
    {field:'url',display:'URL', visible:true,editable:false},
    {field:'quantity',display:'Quantity', visible:true,editable:false},
    {field:'basePrice',display:'Base Price', visible:true,editable:false},
    {field:'discount',display:'discount', visible:true,editable:false},
    {field:'description',display:'description', visible:false,editable:false},
    {field:'specification',display:'specification', visible:false,editable:false},
    {field:'manufacturer',display:'manufacturer', visible:true,editable:false},
    {field:'seller',display:'seller', visible:true,editable:false},
    {field:'image_id',display:'image_id', visible:true,editable:false},
    {field:'category_id',display:'Category',
     visible:true,editable:false,parentApi:'category',parentField:'name'},
    {field:'subCategory_id',display:'Sub-Category',
    visible:true,editable:false,parentApi:'subCategory',parentField:'name'},
    {field:'sectionalCategory_id',display:'Sectional-Category',
    visible:true,editable:false,parentApi:'sectionalCategory',parentField:'name'},
    {field:'brand_id',display:'Brand',
    visible:true,editable:false,parentApi:'brand',parentField:'name'},
    {field:'tags',display:'Tags', type:'Array',
     visible:true,editable:true,parentApi:'tags',parentField:'name'}
  ];

  constructor(private adminService:AdminService,private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Admin: Products');
  }

}
