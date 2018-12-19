import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";

import { StorefrontService } from '../services/storefront-service.service';

@Component({
  selector: 'carousel-set',
  templateUrl: './carousel-set.component.html',
  styleUrls: ['./carousel-set.component.less']
})
export class CarouselSetComponent implements OnInit, AfterViewInit {

  @Input() set: any;
  @Input() api:String;
  @Input() parentApis:String[];
  @Input() editLocation:String;
  recordWidth: number = 260;
  shifted: number = 0;
  @ViewChild('train') train;
  @ViewChild('track') track;

  constructor(private store:StorefrontService, private router:Router) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    const trackLen = this.track.nativeElement.clientWidth;
    this.recordWidth = trackLen/(Math.round(trackLen/260));
  }

  showPrev(){
    console.log('train : ', this.train.nativeElement.style);
    if(this.shifted > -260){
      this.shifted = 0;
    } else {
      this.shifted = this.shifted + 260;
    }
    this.train.nativeElement.style.transform = 'translateX(' + this.shifted + 'px)';
  }

  showNext(){
    console.log(window.innerWidth);
    console.log(this.train.nativeElement.clientWidth);
    console.log(this.track.nativeElement.clientWidth);
    if(this.shifted > -260){
      this.shifted = 0;
    } else {
      this.shifted = this.shifted + 260;
    }
    this.train.nativeElement.style.transform = 'translateX(' + this.shifted + 'px)';

  }
}
