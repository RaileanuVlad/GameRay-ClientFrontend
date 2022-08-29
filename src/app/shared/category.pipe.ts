import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (items.length === 0) { return items; }
    if (filter['categoryName'] && filter['categoryName'].length>0) {

      return items.filter(game => filter['categoryName'].every(category => {
        return game.categoryName.includes(category)
      }) )

    } else {
      return items;
    }
  }

}
