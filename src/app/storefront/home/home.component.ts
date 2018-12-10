import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StorefrontService } from '../../services/storefront-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  homeBanner: any = [];

  constructor(private title: Title, private storeService: StorefrontService) { }

  ngOnInit() {
    this.title.setTitle('KDCD Store');
    this.getBanners();
  }

  getBanners(){
    this.storeService.getAllPublicData('Banner',{'taggedTo': 'Home'}).subscribe(
      data => {
        console.log(' found Banner : ', data);
        this.homeBanner = data['data'];
      },
      error => {
        console.log(' in err : ', error);
      }
    )
  }

}
