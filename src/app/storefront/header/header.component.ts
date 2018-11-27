import { Component, OnInit } from '@angular/core';
import { StorefrontService } from '../../services/storefront-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  headerCategories: any = [];
  constructor(private storeService: StorefrontService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){    
    this.storeService.getAllPublicData('Category').subscribe(
      data=>{
        this.headerCategories = data['data'];
        console.log('Categories: ', data['data']);
      },
      error=>{
        console.log('error: ' , error);
      }
    )
  }

}
