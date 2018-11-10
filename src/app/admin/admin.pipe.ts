import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSubCategory'
})
export class SubCategoryFilterPipe implements PipeTransform {

  transform(items: any[], parentId:String): any {
    return items.filter(function(parentItem){
      return parentItem.category_id==parentId;
    });
  }

}

@Pipe({
  name: 'filterSectionalCategory'
})
export class SectionalCategoryFilterPipe implements PipeTransform {

  transform(items: any[], parentId:String): any {
    return items.filter(function(parentItem){
      return parentItem.subCategory_id==parentId;
    });
  }

}

@Pipe({
  name: 'filterBrand'
})
export class BrandFilterPipe implements PipeTransform {

  transform(items: any[], parentId:String): any {
    return items.filter(function(parentItem){
      return parentItem.subCategories.indexOf(parentId)>=0;
    });
  }

}