import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductHelperService {

  constructor() { }

  getPriceFormat(price) {
    let actualPrice = price.toFixed(2).toString(),
      formattedPrice = '',
      counterHundred = 3,
      counterOthers = 2;
    let digitPriceArray = actualPrice.split(''), digitLen = digitPriceArray.length;
    for (let i = 0; i < digitLen; i++) {
      let lastIndex = digitLen - i - 1;
      if(i <= 2) {
        formattedPrice = digitPriceArray[lastIndex] + formattedPrice;
      } else {
        if(counterHundred > 0) {          
          formattedPrice = digitPriceArray[lastIndex] + formattedPrice;
          counterHundred--;
        } else {
          if (counterOthers == 0) {
            formattedPrice = digitPriceArray[lastIndex] + ',' + formattedPrice;
            counterOthers = 1;
          } else if ( counterOthers == 2 ) {
            formattedPrice = digitPriceArray[lastIndex] + ',' + formattedPrice;
            counterOthers--;
          } else {
            formattedPrice = digitPriceArray[lastIndex] + formattedPrice;
            counterOthers--;
          }
        }
      }
    }
    return formattedPrice.split('.00')[0];
  }

}
