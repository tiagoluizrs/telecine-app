import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Step2Component } from './step2.component';

describe('Step2Component', () => {
  let component: Step2Component;
  let fixture: ComponentFixture<Step2Component>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ Step2Component ],
      providers:[],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2Component);
    compiled = fixture.debugElement.nativeElement;

    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('Verificando cabeçalho principal do envio com sucesso', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('h1').textContent).toContain('Falta pouco!');
  });

  it('Verificando texto de envio com sucesso', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent.trim()).toEqual('Em instantes você receberá seu login e senha através do e-mail cadastrado para aproveitar seus 7 dias grátis');
  });

  it('Verificando link de retorno para a home', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('a').textContent).toContain('Voltar para o início.');
  });
});
