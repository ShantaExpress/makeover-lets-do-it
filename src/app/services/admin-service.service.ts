import { Injectable,EventEmitter,OnInit } from "@angular/core";
import { HttpClient,HttpResponse,HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  
  loggedUser = new EventEmitter<User>();
  selfUser:User;
  url: any = 'http://localhost:3000/api/';
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
    return this.http.post(this.url+"user/admin-signin",body,this.gethttpHeaders(false));
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
        this.router.navigateByUrl('/admin/login');
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
    
    addCategory(categoryName){        
        console.log('categoryName : ' , categoryName);
        const body = JSON.stringify({name:categoryName});
        console.log('body: ' , body);
        console.log('url : ' , this.url+"category");
        return this.http.post(this.url+"category",body,this.gethttpHeaders(true));
    }
    updateCategory(category){
        
        const body = JSON.stringify({name:category.name});
        console.log('body: ' , body);
        console.log('url : ' , this.url+"category");
        return this.http.put(this.url+"category/"+category._id,body,this.gethttpHeaders(true));
    }
    getAllCategories(){
        return this.http.get(this.url+"category",this.gethttpHeaders(true));
    }
    removeCategory(id){
        return this.http.delete(this.url+'category/remove/'+id,this.gethttpHeaders(true));
    }

    addSubCategory(subCategory){
        console.log('subCategory : ' , subCategory);
        const body = JSON.stringify(subCategory);
        console.log('body: ' , body);
        console.log('url : ' , this.url+"subCategory");
        return this.http.post(this.url+"subCategory",body,this.gethttpHeaders(true));
    }
    getAllSubCategories(){
        return this.http.get(this.url+"subCategory",this.gethttpHeaders(true));
    }


    //generic Api's service

    getAllPrivateData(api:String){
        return this.http.get(this.url+api,this.gethttpHeaders(true));
    }

    updateItem(api:String,obj){                
        const body = JSON.stringify(obj);
        console.log('body: ' , body);
        return this.http.put(this.url+api+'/'+obj._id,body,this.gethttpHeaders(true));
    }

    removeItem(api:String,id){
        return this.http.delete(this.url+api+'/'+id,this.gethttpHeaders(true));
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
