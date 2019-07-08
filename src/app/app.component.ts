import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.sass']
})
export class AppComponent{
  title = 'Assine Telecine'; 
  hide_loading = false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
    ) {
    /* Método que utilizamos para a exibição do preloading superior

    - NavigationStart: Evento que é disparado no momento em que a página inicia o carregamento.
    ---> Nesse evento estamos dizendo ao hide_loading que ele deve ficar falso, para que o preloader 
    seja exibido na página.

    - NavigationEnd: Evento que é disparado no momento em que a página terminar de carregar.
    - NavigationCancel: Evento que é disparado no momento em que o carregamento da página for cancelado.
    - NavigationError: Evento que é disparado no momento em que a página sofrer algum error.
    ---> Nesses eventos estamos dizendo ao hide_loading que ele deve ficar true, para que o preloader 
    seja ocultado da página.
    */
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.hide_loading = false;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.hide_loading = true;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    /* Aqui estamos dizendo para a aplicação esperar 2 segundos antes de detectar qualquer mudança nela
      e fazer renderizações na página.
    */
    setInterval(() => {
      this.cdr.detectChanges();
    }, 2000);
  }

  ngAfterViewInit() {
    /* Aqui estamos desanexando a view após sofrer carregamento de qualquer detecção de mudanças,
    tendo em vista que a aplicaçao é uma LP isso não é necessário e fazendo isso deixamos ela mais rápida.
    */
    this.cdr.detach();
  }
}
