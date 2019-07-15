import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListagemAlunosComponent } from './listagem-alunos/listagem-alunos.component';
import { DetalhePessoaComponent } from './detalhe-pessoa/detalhe-pessoa.component';
import { FiltraNomePipe } from './filtra-nome.pipe';
import { FiltraClassePipe } from './filtra-classe.pipe';
import { FiltraSeriePipe } from './filtra-serie.pipe';



@NgModule({
  declarations: [
    AppComponent,
    ListagemAlunosComponent,
    DetalhePessoaComponent,
    FiltraNomePipe,
    FiltraClassePipe,
    FiltraSeriePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
