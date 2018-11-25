
import { Component, OnInit, Directive,ElementRef,Renderer,ViewChild } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AdminServiceService } from '../../services/admin-service.service';
import { Title } from '@angular/platform-browser';
import { GridTableComponent } from '../../grid-table/grid-table.component';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { HttpClient,HttpResponse,HttpHeaders } from '@angular/common/http';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.less']
})
export class MediaComponent implements OnInit {
  files:any=[];
  CRUDSuccess:any="";
  uploader:FileUploader = new FileUploader({
    url:this.getURL(),
    headers: [{
      name: 'Authorization',
      value: localStorage.getItem('token')
    }]
  });
  constructor(private adminService: AdminServiceService,private router:Router,private title:Title) {
    this.title.setTitle('Admin: Media');
    var self = this;
    this.uploader.options.removeAfterUpload = true;
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, res:any, status:any, headers:any)=>{
      res = JSON.parse(res);
      console.log('res : ', res);
      // console.log('res : ', typeof res);
      // this.profilePicURI = 'http://localhost:3000/user/image/'+res.file.filename;
      // console.log('this.profilePicURI : ' , this.profilePicURI);
      // this.attachmentList.push(JSON.parse(res));
      console.log('over here');
      console.log('after uploading here is the uploader: ' , this.uploader);
      this.CRUDSuccess = "Image uploaded successfully!!";
      setTimeout(function(){
        self.CRUDSuccess = "";
      },5000);
      this.getFiles();
    }
  }

  ngOnInit() {
    this.getFiles();
  }

  copyToClipboard(fileName) {

    var copyText = document.getElementById(fileName);
    copyText['select']();
    document.execCommand("copy");
  }

  getURL(){
    return 'http://localhost:3000/api/media/?token='+localStorage.getItem('token');
  }

  getFiles(){
    this.adminService.getAllPrivateData('media').subscribe(
      data=>{
        console.log('All Files data: ', data);
        this.files = data['data'];
      },
      error=>{
        console.log('Error files all: ', error);
      }
    );
  }
  downloadFile(uploadfileName){
    console.log('in downloadFile function:', uploadfileName);
      this.adminService.downloadFile(uploadfileName)
      .subscribe(
          data => {
            console.log('data: ', data);
            saveAs(data, uploadfileName)
          },
          error => console.error(error)
      );
  
  }

  deleteFile(id){
    var self = this;
    this.adminService.removeItem('media/files',id).subscribe(
      data=>{
        console.log('file removed:', data);
        this.getFiles();
        this.CRUDSuccess="File removed successfully";
        setTimeout(function(){
          self.CRUDSuccess = "";
        },5000);

      },
      error=>{
        console.log('file removal error:', error);
      }
    );
  }
}
