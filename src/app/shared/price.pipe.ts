import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PricePipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (items.length === 0) { return items; }
    if (filter['price1'] && filter['price2']) {

      return items.filter(game => game.price >= filter['price1'] && game.price <= filter['price2'])

    } else {
      return items;
    }
  }

}
