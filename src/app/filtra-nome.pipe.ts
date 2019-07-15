import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtraNome'
})
export class FiltraNomePipe implements PipeTransform {

  transform(nomesAlunos: any, termoBuscado: string): any {

    if(!nomesAlunos || !termoBuscado)
    {
      return nomesAlunos;
    }

    console.log();

    return nomesAlunos.filter(nome => nome.nome.toLowerCase().indexOf(termoBuscado.toLowerCase) !== -1);
  }

}