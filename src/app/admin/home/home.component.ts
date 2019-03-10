import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  UseCases=["Address", "Companies","User Groups", "Employees", "Customers", "Order", "Order Entries", 
  "Quotes", "Order History", "Booking Entry", "Prices", "Taxes", "Discounts", "Delivery Costs", "Payment Modes",
  "Marketing", "Product Reviews","Promotion Website Groups", "Product References", "Promotion Rules"];
  
  ContentNavigation = [
    { name: 'Banners', link: '/banners'},
    { name: 'Address', link: '/Address'},
    { name: 'Companies', link: '/Companies'},
    { name: 'Tags', link: '/tags'},
    { name: 'ProductFeatures', link: '/productFeatures'}
  ]

  constructor(private title:Title) { }

  ngOnInit() {
    this.title.setTitle('Admin:Home');
  }

}
