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
  homeSettings: any;
  miscellaneous: any = [];
  constructor(private title: Title, private storeService: StorefrontService) { }

  ngOnInit() {
    this.title.setTitle('KDCD Store');    
    this.getHomeSettings();
  }

  getHomeSettings(){
    this.storeService.getPageSettings('home').subscribe(
      data => {
        this.homeSettings = data['data'];
        if(this.homeSettings['showTopCarousel']){
          this.getBanners();
        }
        this.showMiscellaneous();
      },
      error => {
        console.log(' in err : ', error);
      }
    )
  }

  showMiscellaneous(){
    if(this.homeSettings && this.homeSettings.miscellaneous && this.homeSettings.miscellaneous.length){
      for(let i = 0; i < this.homeSettings.miscellaneous.length; i++){
        this.getSets(this.homeSettings.miscellaneous[i]);
      }
    }
  }
  
  getSets(set){
    let self = this;
    this.storeService.getAllPublicData('Product', {'tags':set.selectionTag}).subscribe(
      data => {
        self.miscellaneous.push(
          {
            header : set.header,
            records: data['data']
          }
        );
        console.log(self.miscellaneous);
      },
      error => {
        console.log(' in err : ', error);
      }
    )
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

  // getNewSets(){
  //   this.storeService.getAllPublicData('Product',{'': 'new'}).subscribe(
  //     data => {
  //       console.log(' found Banner : ', data);
  //       this.homeBanner = data['data'];
  //     },
  //     error => {
  //       console.log(' in err : ', error);
  //     }
  //   )
  // }

}
