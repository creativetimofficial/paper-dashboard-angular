import { Pipe, PipeTransform } from '@angular/core';
import { Citas } from 'app/model/citas';
import { Pacientes } from 'app/model/pacientes';

@Pipe({
  name: 'filtercitas'
})
export class FiltercitasPipe implements PipeTransform {

  transform(value: any[], query: string) {
  }
}