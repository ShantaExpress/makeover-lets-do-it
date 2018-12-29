import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { StorefrontService } from '../../services/storefront-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {
  category: any = [];
  constructor(
    private title: Title,
    private storeService: StorefrontService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.url.subscribe(url =>{      
      var category = this.route.snapshot.params['category'];
      this.storeService.getAllPublicData('Category', {identifier: category}).subscribe(
        data => {
          this.category = data['data'];
          console.log('data categories: ', this.category);
        },
        error => {
          console.log('error: ', error);
        }
      );
    });
  }

}
