import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByKeyword'
})
export class SearchByKeywordPipe implements PipeTransform {
  transform(dataArr: any[], keyword: string): any[] {
    if(keyword != ''){
      if(!dataArr){
        return [];
      }
      else{
        return dataArr.filter(data => {          
          return Object.values(data).toString().toLowerCase().includes(keyword.toLowerCase());
        });
      }
    }
    return dataArr;
  }
}
