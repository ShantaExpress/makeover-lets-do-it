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
  disableNext: boolean = false;
  recordWidth: number = 260;
  shifted: number = 0;
  @ViewChild('train', {static: false}) train;
  @ViewChild('track', {static: false}) track;

  constructor(private store:StorefrontService, private router:Router) { }

  ngOnInit() {
    console.log('set: ', this.set);
  }

  ngAfterViewInit(){
    if(this.track){
      const trackLen = this.track.nativeElement.clientWidth;
      this.recordWidth = trackLen/(Math.round(trackLen/260));
    }
  }

  showPrev(){
    this.disableNext = false;
    if((this.shifted + this.recordWidth) < 0) {
      this.shifted = this.shifted + this.recordWidth;
    } else {
      this.shifted = 0;
    }
    this.train.nativeElement.style.transform = 'translateX(' + this.shifted + 'px)';
  }

  showNext(){
    if((this.shifted - this.recordWidth) > (this.track.nativeElement.clientWidth - this.train.nativeElement.clientWidth)) {
      this.shifted = this.shifted - this.recordWidth;
      this.disableNext = false;
    }
    else {
      console.log('in else');
      if (this.track.nativeElement.clientWidth < this.train.nativeElement.clientWidth) {
        this.shifted = (this.track.nativeElement.clientWidth - this.train.nativeElement.clientWidth);
      }
      this.disableNext = true;
    }
    console.log('this.shifted : ', this.shifted);
    console.log('(this.track.nativeElement.clientWidth - this.train.nativeElement.clientWidth) : ', (this.track.nativeElement.clientWidth - this.train.nativeElement.clientWidth));

    this.train.nativeElement.style.transform = 'translateX(' + this.shifted + 'px)';

  }
}
