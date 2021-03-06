import { Injectable,EventEmitter,OnInit } from "@angular/core";
import { HttpClient,HttpResponse,HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorefrontService {
  productInfo: any = {
    Brand: [],
    Category: [],
    SubCategory: [],
    SectionalCategory: []    
  };
  checks: any = 0;
  ready: any = false;
  getNotifiedWhenReady: EventEmitter<boolean> = new EventEmitter(true);

  loggedUser = new EventEmitter<User>();
  selfUser:User;
  url: any = 'http://localhost:3000/api/';
  publicUrl: any = this.url + 'public/';
  //headers:Headers = new Headers({'Content-Type': 'application/json'});
  httpOptions:any;
  constructor(private http: HttpClient, private router: Router) {
      this.fetchProductInfo('Brand');
      this.fetchProductInfo('Category');
      this.fetchProductInfo('SubCategory');
      this.fetchProductInfo('SectionalCategory');
   }

   fetchProductInfo(api) {
    this.getAllPublicData(api).subscribe(
        data => {
          this.productInfo[api] = data['data'];
          this.checks++;
          if (this.checks === Object.keys(this.productInfo).length) {
            this.ready = true;
            this.getNotifiedWhenReady.next(true);
          }
        },
        error => {
          console.log('error: ', error);
        }
      );
   }

   getProductInfo(api,prop,value,returnProp) {
       let info = this.productInfo[api].find(item=>{
           return item[prop] == value;
       });
       if(returnProp) { 
            return (info && info[returnProp])?info[returnProp]:undefined;
       } else {
           return info || undefined;
       }
       
   }

  gethttpHeaders(token:Boolean){
    if(token){
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': localStorage.getItem('token')
            })
        };
    }
    else{
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
    }
    
    return this.httpOptions;
  }
  
  signin(user){
    console.log('user : ' , user);
    const body = JSON.stringify(user);
    console.log('body: ' , body);
    console.log('url : ' , this.url+"user/signin");
    return this.http.post(this.url+"user/customer-signin",body,this.gethttpHeaders(false));
  }
  
  getLoggedInUser(){      
      return this.http.get(this.url+"user/logged/user",this.gethttpHeaders(true));
  }
    clearToken() {
        localStorage.removeItem('token');
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
    signout(){
        this.clearToken();
        this.loggedUser.emit(undefined);
        this.router.navigateByUrl('/customer/login');
    }
    checkValidLoggedIn(){
        var currentURL = window.location.pathname;
        if(localStorage.getItem('token')){
            this.getLoggedInUser()
            .subscribe(
                (data)=>{
                    console.log('data: ' , data);
                    this.router.navigateByUrl(currentURL);
                    this.loggedUser.emit(data['obj']);
                },
                error=>{
                     this.signout();
                }
            )
        }
        else{
            this.signout();            
        }
    }
    
    //generic Api's service

    getAllPublicData(api:String, queryObj?:any){
        let queryString = '';
        if(queryObj){
            let keys = Object.keys(queryObj);
            for (var i = 0; i < keys.length; i++) {
                if(i==0){
                    queryString += '?';
                }
                queryString += keys[i]+'='+queryObj[keys[i]];
                if(i < keys.length-1){
                    queryString += '&';
                }
            }
        }
        return this.http.get(this.publicUrl+'get/'+api+queryString,this.gethttpHeaders(false));
    }

    filterPublicData (api:String, filterObj?:any) {
        let body = JSON.stringify(filterObj || {});
        return this.http.post(this.publicUrl+'post/'+api, body, this.gethttpHeaders(false));
    }

    getPageSettings(page:String){
        return this.http.get(this.publicUrl+'settings/'+page,this.gethttpHeaders(false));
    }

    getHeaders() {
        return this.http.get(this.publicUrl+'getHeaders',this.gethttpHeaders(false));
    }

    updateItem(api:String,obj){                
        const body = JSON.stringify(obj);
        console.log('body: ' , body);
        return this.http.put(this.url+api+'/'+obj._id,body,this.gethttpHeaders(true));
    }

    removeItem(api:String,ids){
        console.log('ids : ', ids);
        return this.http.delete(this.url+api+'/'+ids,this.gethttpHeaders(true));
    }

    addItem(api:String,obj){
        const body = JSON.stringify(obj);
        console.log('body: ' , body);
        return this.http.post(this.url+api,body,this.gethttpHeaders(true));
    }

    getItem(api:String,id:String){
        return this.http.get(this.url+api+'/'+id,this.gethttpHeaders(true));
    }

    downloadFile(file:String){
        var body = {filename:file};

        return this.http.post(this.url+'media/download/'+file,body,{
            responseType : 'blob',
            headers:new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': localStorage.getItem('token')
            })            
        });
    }
}
