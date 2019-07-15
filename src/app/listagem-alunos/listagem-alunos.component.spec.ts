import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemAlunosComponent } from './listagem-alunos.component';

describe('ListagemAlunosComponent', () => {
  let component: ListagemAlunosComponent;
  let fixture: ComponentFixture<ListagemAlunosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemAlunosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
