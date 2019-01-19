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
  category: any;
  subCategories: any = [];

  constructor(
    private title: Title,
    private storeService: StorefrontService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.url.subscribe(url =>{      
      var category = this.route.snapshot.params['category'];
      this.fetchCategory(category);
    });
  }

  fetchCategory(category: string) {
    this.storeService.getAllPublicData('Category', {identifier: category}).subscribe(
      data => {
        this.category = (data['data'].length) ? data['data'][0] : {};
        if (this.category._id) {
          this.fetchSubCategory(this.category._id);
        }
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  fetchSubCategory(categoryId: string) {
    this.storeService.getAllPublicData('SubCategory', {category_id: categoryId}).subscribe(
      data => {
        console.log('subCategory fiund: ', data);
        this.subCategories = data['data'];
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

}
