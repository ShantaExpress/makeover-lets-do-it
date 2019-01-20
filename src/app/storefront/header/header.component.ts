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
    this.getHeaders();
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

  getHeaders(){
    this.storeService.getHeaders().subscribe(
      data=>{        
        this.headerCategories = data['data'];
        console.log('Categories: ', data['data']);
      },
      error=>{
        console.log('error: ' , error);
      }
    )
  }

  categorySelected() {
    setTimeout(function(){
      var elements = document.getElementsByClassName('dropdown-menu');
      for(var i = 0; i < elements.length; i++){
        elements[i].setAttribute('class',elements[i].getAttribute('class').split('show').join(' '));
        console.log(elements[i].getAttribute('class'));
      }
    },100);
  }

}
