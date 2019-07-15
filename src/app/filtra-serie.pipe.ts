import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtraSerie'
})
export class FiltraSeriePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
