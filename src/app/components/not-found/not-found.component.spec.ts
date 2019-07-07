import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    compiled = fixture.debugElement.nativeElement;

    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('Verificando cabeçalho principal da página 404', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('h1').textContent.trim()).toEqual('Página não encontrada!');
  });

  it('Verificando texto de ajuda', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent.trim()).toEqual('A página que você solicitou não foi encontrada, ela pode ter sido renomeada. Voltar para o início.');
  });

  it('Verificando link de retorno para a home', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('a').textContent.trim()).toEqual('Voltar para o início.');
  });
});
