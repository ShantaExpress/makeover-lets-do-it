import { Component, OnInit, Directive,ElementRef,Renderer,ViewChild } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminService } from '../../../services/admin-service.service';
import { GridTableComponent } from '../../../grid-table/grid-table.component';
//import { setTimeout } from 'timers';

import {GridDataType} from '../../../models/grid.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.less']
})
export class BannerListComponent implements OnInit {

  configuration:GridDataType[]=[
    {field:'name',display:'Banner Name', visible:true, editable:true},
    {field:'imageId',display:'Banner Image', visible:true, editable:true},
    {field:'taggedTo',display:'Tagged To', visible:true, editable:true},
    {field:'description',display:'Description', visible:true, editable:true},
    {field:'isEnabled',display:'IsEnabled', visible:true,editable:true},
    {field:'rank',display:'Rank', visible:true, editable:true, type: 'number'},
    {field:'title',display:'Title', visible:true, editable:true},
    {field:'paragraph',display:'Paragraph', visible:true, editable:true},
    {field:'link',display:'URL Link', visible:true,editable:true},
    {field:'validUpto',display:'Validity Upto', visible:true, editable:true, type: 'date'},
  ];

  @ViewChild(GridTableComponent)
  private grid: GridTableComponent;

  constructor(private adminService: AdminService,private router:Router,private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Admin: Banner');
  }

}
