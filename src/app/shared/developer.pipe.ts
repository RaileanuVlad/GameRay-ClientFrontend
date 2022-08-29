import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'developerFilter'
})
export class DeveloperPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (items.length === 0) { return items; }
    if (filter['developerName'] && filter['developerName']!="") {

      return items.filter(game => game.developerName === filter['developerName'])

    } else {
      return items;
    }
  }

}
