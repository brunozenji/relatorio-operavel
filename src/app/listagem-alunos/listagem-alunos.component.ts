import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { DadoService } from '../dado.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-listagem-alunos',
  templateUrl: './listagem-alunos.component.html',
  styleUrls: ['./listagem-alunos.component.scss']
})
export class ListagemAlunosComponent implements OnInit {

  copia = [];

  // Variáveis alimentadas por ReqHttp
  alunos: any;  //
  classes: any; // Arrays com conteudo vindo do service (Usado no filtro e ao preencher o array aluno Montado)
  series: any;  //
  nomes = [];       //Lista de nomes para gerar aleatório
  sobrenomes = [];  //Lista de sobrenomes para gerar aleatório


  // Lista Principal
  alunoMontado = []; //lista completa de alunos na página

  // Var que alimenta o gráfico
  arr_graf_series = [];
  arr_graf_qtd = [];

  chart = [];           //Gráfico

  serieBuscada: any;
  classeBuscada: any;

  constructor(private dadoService: DadoService) { }

  ngOnInit() {
    this.criaGrafico();
    this.reqArquivos();
  }

  alimentaAlunoMontado (arrAluno,arrClasse,arrSerie) {
    for(let i = 0; i < arrAluno.length; i++)
    {
      var serie = '';
      var classe = '';
      
      for(let j = 0; j < arrClasse.length; j++)
      {
        if(arrAluno[i].classId===arrClasse[j].id)
        {
          classe = arrClasse[j].name;
        }
      }

      for(let k = 0; k < arrSerie.length; k++)
      {
        if(arrAluno[i].degreeId===arrSerie[k].id)
        {
          serie = arrSerie[k].name;
        }
      }

      this.alunoMontado.push({
        nome: arrAluno[i].name,
        classe: classe,
        serie: serie,
        degreeId: arrAluno[i].degreeId,
        classId: arrAluno[i].classId 
      });
    }
  }

  geraNovosAlunos() {
    this.alunos = [];
    for(let i=0; i < 300; i++)
    {
      //id continuação

      //primeiro nome aleatorio
      let id_nome_aleatorio = Math.floor(Math.random() * (this.nomes.length))+1;
      let nome_alatorio = '';
      for(let x = 0; x < this.nomes.length; x++)
      {
        if(this.nomes[x].id===id_nome_aleatorio)
          nome_alatorio = this.nomes[x].name;
      }

      //segundo nome aleatorio
      let id_sobrenome_aleatorio = Math.floor(Math.random() * (this.sobrenomes.length))+1;
      let sobrenome_alatorio = '';
      for(let x = 0; x < this.sobrenomes.length; x++)
      {
        if(this.sobrenomes[x].id===id_sobrenome_aleatorio)
          sobrenome_alatorio = this.sobrenomes[x].last_name;
      }

      //ra aleatório

      //serie aleatoria
      let id_degree_aleatorio = Math.floor(Math.random() * (this.series.length))+1;

      //classe aleatória
      let id_class_aleatorio = Math.floor(Math.random() * (this.classes.length))+1;


      this.alunos.push({
        id: 1,
		    ra: 12346,
		    name: nome_alatorio+' '+sobrenome_alatorio,
		    degreeId: id_degree_aleatorio,
		    classId: id_class_aleatorio
      });
    }
    this.alimentaAlunoMontado(this.alunos,this.classes,this.series);
    this.atualizaGrafico(this.alunoMontado,this.series);
    this.salvaCopia();
  }

  atualizaGrafico(arrAluno,arrSerie) {
    let novo_series = arrSerie.map(arr => arr.name);
    let novo_qtd_novo = arrSerie.map(function(arr) {
      let cont = 0;
      for(let x = 0; x < arrAluno.length; x++)
      {
        if(arrAluno[x].degreeId==arr.id)
          cont++;
      }
      return cont;
    });

    this.chart.data.labels = novo_series;
    this.chart.data.datasets[0] = {
      data: novo_qtd_novo,
      backgroundColor: "rgb(9,165,223)"
    };
    this.chart.update();
  }



  salvaCopia() {
    this.copia = Object.assign(this.copia, this.alunoMontado);
  }

  filtraSerie() {
    if(!this.serieBuscada)
    {
      this.alunoMontado = this.copia;
    }
    else
    {
      this.alunoMontado = this.copia;
      let novoAlunomontado = this.alunoMontado.filter(function(par) {
        return par.degreeId == this.serieBuscada
      },this);
      this.alunoMontado = novoAlunomontado;
    }

    this.atualizaGrafico(this.alunoMontado,this.series);
  }

  filtraClasse() {
    if(!this.classeBuscada)
    {
      this.alunoMontado = this.copia;
    }
    else
    {
      this.alunoMontado = this.copia;
      let novoAlunomontado = this.alunoMontado.filter(function(par) {
        return par.classId == this.classeBuscada
      },this);
      this.alunoMontado = novoAlunomontado;
    }

    this.atualizaGrafico(this.alunoMontado,this.series)
  }


  // Chamadas ao iniciar aplicação
  reqArquivos () {
    forkJoin(
      this.dadoService.listarAlunos(),
      this.dadoService.listarClasses(),
      this.dadoService.listarSeries(),
      this.dadoService.listarNomes(),
      this.dadoService.listarSobreNomes()
    ).subscribe(([resAlunos,resClasses,resSeries,resNomes,resSobreNomes]) => {
      this.alunos = resAlunos;
      this.classes = resClasses.classes;
      this.series = resSeries;
      
      this.nomes = resNomes;
      this.sobrenomes = resSobreNomes;
      
      
      this.alimentaAlunoMontado(this.alunos,this.classes,this.series);
      this.salvaCopia();
      this.atualizaGrafico(this.alunoMontado,this.series)
    });
  }
  criaGrafico() {
    var canvas = <HTMLCanvasElement> document.getElementById('myChart');
    var ctx = canvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    });
  }
}
