import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (items.length === 0) { return items; }
    if (filter['name']) {

      return items.filter(game => game.name.toLowerCase().includes(filter['name'].toLowerCase()))

    } else {
      return items;
    }
  }

}
