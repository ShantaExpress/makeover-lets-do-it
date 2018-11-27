import { Component, OnInit, Input } from '@angular/core';
import {GridDataType} from '../models/grid.model';
import { Router } from "@angular/router";

import {AdminService} from '../services/admin-service.service';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.less']
})
export class GridTableComponent implements OnInit {
  gridData:any[];
  parentData:any={};
  loading:Boolean=false;
  noRecords:Boolean=false;
  recordsToRemove:any = [];
  selectAll:Boolean = false;
  crudSuccess:any;
  crudError:any;
  backupData:any[];
  isValid:any = true;
  optionVal:any={a:2,b:2};
  optionValAr:any[]=[{a:1,b:2},{a:2,b:2},{a:3,b:2}];

  @Input() configuration:GridDataType[];
  @Input() api:String;
  @Input() parentApis:String[];
  @Input() editLocation:String;
  constructor(private admin:AdminService,private router:Router) { }

  ngOnInit() {
    if(this.api && this.configuration){
      this.getAllData();
    }
    if(this.parentApis && this.parentApis.length){
      this.getAllParentData();
    }
  }

  getAllParentData(){
    for(var i = 0;i<this.parentApis.length;i++){
      this.getParentData(this.parentApis[i]);
    }
  }
  getParentData(api){
    var self = this;
    this.admin.getAllPrivateData(api).subscribe(
      data=>{
        self.parentData[api] = data['data'];
        console.log('parentData: ', self.parentData);
      }
    );
  }

  resetGridData(){
    this.gridData = JSON.parse(JSON.stringify(this.backupData));
    this.addSelection(false);
  }

  addSelection(flag: Boolean){
    console.log('in addSelection :', flag);
    for(let i in this.gridData){
      this.gridData[i]['selected'] = flag;
    }
  }

  getAllData(){
    this.gridData=[];
    this.loading = true;
    var self = this;
    this.admin.getAllPrivateData(this.api).subscribe(
      data=>{
        setTimeout(function(){
          self.loading = false;
          self.gridData = data['data'];
          self.addSelection(false);
          self.backupData = JSON.parse(JSON.stringify(self.gridData));
          console.log('over here we got : ' , data['data']);
          if(!data['data'].length){
            console.log('length : ', data['data'].length);
            self.noRecords = true;
          }
        });
      },
      error=>{
        this.loading = false;
        this.noRecords = true;
        console.log('error: ' , error);
      }
    )
  }
  isSingleField(field){
    return !(field.indexOf('.')>=0);
  }
  getExactItem(obj, path){
    path = path.split('.');
    var current = obj;
    while(path.length) {
        if(typeof current !== 'object') return undefined;
        current = current[path.shift()];
    }
    return current;
  }

  deleteSelectedData(){
    this.removeCancel();
    for( let i in this.gridData ) {
      if(this.gridData[i].selected) {
        this.recordsToRemove.push(this.gridData[i]._id);
      }
    }
  }
  
  selectedItemsAvailable() {
    let count = 0;
    for( let i in this.gridData ){
      if(this.gridData[i].selected){
        count++;
      }
    }
    return count;
  }

  deleteItem(item){
    this.removeCancel();
    this.recordsToRemove.push(item._id);
  }

  individualSelection(flag:Boolean){
    this.selectAll = this.selectedItemsAvailable() == this.gridData.length;
  }

  removeCancel(){
    this.recordsToRemove = [];
  }

  removeProceed(){
    let self = this;

    this.admin.removeItem(this.api,this.recordsToRemove.join(',')).subscribe(
      data=>{
        self.crudSuccess = self.api.toUpperCase()+" removed successfully!!";
        self.getAllData();
        self.selectAll = false;
        setTimeout(function(){
          self.crudSuccess='';
        },6000);
      },
      error=>{
        this.crudError = "Deleting failed due to Technical Error";
        setTimeout(function(){
          self.crudError='';
        },6000);
      }
    );
  }

  updateItem(item){
    console.log('in updateItem where item is : ' , JSON.stringify(item));
    // return false;
    var self = this;
    this.admin.updateItem(this.api,item).subscribe(
      data=>{
        this.crudSuccess = this.api.toUpperCase()+" updated successfully!!";
        this.getAllData();
        setTimeout(function(){
          self.crudSuccess='';
        },6000);
      },
      error=>{
        this.crudError = "Updating failed due to Technical Error";
        setTimeout(function(){
          self.crudError='';
        },6000);
      }
    );
  }

  editItem(item, flag){
    if(this.editLocation){
      console.log('editLocation: ', this.editLocation);
      this.router.navigateByUrl(this.editLocation+'/'+item._id);
    } else {
      item.isEditing = flag;
      if(!flag){
        this.resetGridData();
      }
    }
  }


  guardianCall(parentApi,parentField,fieldValue){
    if(this.parentData[parentApi] &&  this.parentData[parentApi].length){
      var field = this.parentData[parentApi].find(function(item){
        return item._id == fieldValue;
      })[parentField];
      return field;
    } else {
      return '';
    }
  }

  setMultipleOption(ar,value){
    var index = ar.indexOf(value);
    console.log('in setMultipleOption: ', index);
    if(index == -1){
      ar.push(value);
    } else {
      ar.splice(index,1);
    }
  }
}
