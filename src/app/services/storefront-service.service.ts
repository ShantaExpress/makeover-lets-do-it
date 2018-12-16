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
  
  loggedUser = new EventEmitter<User>();
  selfUser:User;
  url: any = 'http://localhost:3000/api/';
  publicUrl: any = this.url + 'public/';
  //headers:Headers = new Headers({'Content-Type': 'application/json'});
  httpOptions:any;
  constructor(private http: HttpClient, private router: Router) { }

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
