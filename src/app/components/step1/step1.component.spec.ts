import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FormBuilder } from '@angular/forms';

import { Step1Component } from './step1.component';

describe('Step1Component', () => {
  let component: Step1Component;
  let fixture: ComponentFixture<Step1Component>;
  let compiled: any;
  let formBuilder: FormBuilder = new FormBuilder();
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ Step1Component ],
      providers:[
        { provide: FormBuilder, useValue: formBuilder },
        HttpClient, 
        HttpHandler
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step1Component);
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    component.ngOnInit();

    de = fixture.debugElement.query(By.css('form'))
    el = de.nativeElement

    fixture.detectChanges();
  });

  it('Verificando texto do formulário de experimente por 7 dias.', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent.trim()).toEqual('Para começar a usar seus 7 dias grátis precisamos de alguns dados.');
  });

  it('Verificando o formulário inválido', async() => {
    component.loginForm.controls['name'].setValue('');
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['cpf'].setValue('');
    component.loginForm.controls['state'].setValue('');
    component.loginForm.controls['city'].setValue('');

    expect(component.loginForm.valid).toBeFalsy();
  })

  it('Verificando o formulário válido', async() => {
    component.loginForm.controls['name'].setValue('Tiago Luiz');
    component.loginForm.controls['email'].setValue('tiagoluizribeirodasilva@gmail.com');
    component.loginForm.controls['cpf'].setValue('147.225.497-02');
    component.loginForm.controls['birthday'].setValue('27/06/1995');
    component.loginForm.controls['city'].setValue('Rio de Janeiro');
    component.loginForm.controls['state'].setValue('Rio de Janeiro');

    expect(component.loginForm.valid).toBeTruthy();
  })

  it('Chamando o método onSubmit', async()=> {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');

    el = fixture.debugElement.query(By.css('button#submit')).nativeElement;
    el.click();

    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  })
});
