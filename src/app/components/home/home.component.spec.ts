import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { HttpClient, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { HomeComponent } from './home.component';

import { HttpService } from '../../services/Http/http.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, SlickCarouselModule ],
      declarations: [ HomeComponent ],
      providers: [
        HttpClient, 
        HttpHandler,
        HttpService,
        HttpTestingController
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    compiled = fixture.debugElement.nativeElement;
    
    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('Verificando textos e link do banner', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.banner h1').textContent.trim()).toEqual('Filmes exclusivos dos maiores estúdios, é só dar um play');
    expect(compiled.querySelector('.banner h2').textContent.trim()).toEqual('Curta 7 dias grátis, assine por R$ 37,90/mês e cancele quando quiser.');
    
    let banner_a = compiled.querySelector('.banner a')
    
    expect(banner_a.textContent.trim()).toEqual('Experimente Grátis');
    expect(compiled.querySelector('.banner a').getAttribute('routerLink')).toEqual('/experimentar');
  });

  it('Verificando textos das box', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('.devices .col h3').textContent.trim()).toEqual('Dispositivos');
    expect(compiled.querySelector('.devices .col h4').textContent.trim()).toEqual('O melhor catálogo. Em todas as telas.');

    expect(compiled.querySelectorAll('.devices .box__col h5')[0].textContent.trim()).toEqual('Assista na TV');
    expect(compiled.querySelectorAll('.devices .box__col h5')[1].textContent.trim()).toEqual('Ou onde quiser');

    let items_list = compiled.querySelectorAll('.devices .box__col ul li')
    expect(items_list[0].textContent.trim()).toContain('Smart TVs');
    expect(items_list[1].textContent.trim()).toContain('Chromecast');
    expect(items_list[2].textContent.trim()).toContain('Xbox One');
    expect(items_list[3].textContent.trim()).toContain('Android');
    expect(items_list[4].textContent.trim()).toContain('IOS');
    expect(items_list[5].textContent.trim()).toContain('PC');
  });
});
