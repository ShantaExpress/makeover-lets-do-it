import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { StorefrontService } from '../../services/storefront-service.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.less']
})
export class SubCategoryComponent implements OnInit {

  constructor(
    private title: Title,
    private storeService: StorefrontService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
  }

}
