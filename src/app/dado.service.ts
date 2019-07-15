import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadoService {

  alunosUrl = './assets/students.json';
  classesUrl = './assets/classes.json';
  seriesUrl = './assets/degrees.json';
  nomesUrl = './assets/names.json';
  sobreNomesUrl = './assets/last-name.json';

  dados: any;

  constructor(private http: HttpClient) { }

  listarAlunos () {
    return this.http.get<any[]>(`${this.alunosUrl}`);
  }
  listarClasses () {
    return this.http.get<any[]>(`${this.classesUrl}`);
  }

  listarSeries () {
    return this.http.get<any[]>(`${this.seriesUrl}`);
  }

  listarNomes() {
    return this.http.get<any[]>(`${this.nomesUrl}`);
  }

  listarSobreNomes() {
    return this.http.get<any[]>(`${this.sobreNomesUrl}`);
  }

}
