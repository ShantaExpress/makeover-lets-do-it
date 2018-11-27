import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin-service.service';

@Injectable()
export class AdminGuard implements CanActivate{
    constructor(private adminService: AdminService, private router: Router){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
            console.log('in canActivate where logged in is :' , this.adminService.isLoggedIn());
            if(!this.adminService.isLoggedIn()){
                this.router.navigateByUrl('/admin/login');
            }
            return this.adminService.isLoggedIn();
    }
}