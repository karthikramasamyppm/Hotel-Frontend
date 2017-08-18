import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(objArray: Array<object>, filterString: string, propName: string): Array<object> {
    return objArray.filter(
      (item: object) => item[propName].toLowerCase().indexOf(filterString.toLowerCase()) !== -1
    );
  }

}
