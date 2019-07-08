import { Component, OnInit } from '@angular/core';
import { Observable, interval, throwError, of,  } from 'rxjs';
import { retryWhen, flatMap } from 'rxjs/operators';

// Serviços próprios do projeto
import { SeoService } from '../../services/Seo/seo.service';
import { HttpService } from '../../services/Http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {
  movies: Observable<Array<any>>;
  slideConfig: any;
  window_size: number;

  /* Essas variávels recebem valores padrões para que nenhum erro
  seja disparado no console no momento da renderização do html,
  tendo em vista que itens como preloader do carousel, banner e as box
  de imagens carregam instantâneamente e precisam de valores pré-definidos,
  ainda que esses sejam null.
  */
  current_banner: any = { 'image': null,  'title': null };
  highlights: any = [
    { 'wallpaper': null, 'title': null },
    { 'wallpaper': null, 'title': null },
  ];
  movie_sizes: any = {  banner: 'hero3x1' };
  hide_preload_carousel: boolean = false;

  constructor(
    private seoService: SeoService,
    private httpService: HttpService
  ){
    this.seoService.setTitlePage('Assina Telecine - Início');
    this.setMetaTag();
    this.configure_sizes();
  } 

  ngOnInit() {
    this.getMovies();
  }


  /* Método que analisa o tamanho da página e define o tamanho adequado de banner para para o front.

  Ela irá armazenar em uma chave esse tamanho, para usarmos sempre que o banner tiver sua image trocada.
  A troca de imagem do banner ocorre no momento em que clicamos em um item do carousel.
  */
  configure_sizes(): void{
    try{
      this.window_size = window.innerWidth;

      if(this.window_size > 768){
        this.movie_sizes.banner = 'hero3x1';
      }else if(this.window_size < 768 && this.window_size > 360){
        this.movie_sizes.banner = 'hero3x1';
      }else{
        this.movie_sizes.banner = 'hero4x3';
      }
    }catch(error){
      console.log(`[[HomeComponent | configure_sizes]] >> Um erro ocorreu no momento da definição do tamanho do banner. Descrição do erro: ${error}`);
    }
  }


  /*
    Método que usamos para pegar os filmes que serão exibidos no carousel .
    Formato do dado retornado.
    Um array com vários objetos dentro: [{"titulo_original": "Uma Quase Dupla", "id": "11157", ...}, ...]

    O método possui o retryWhen que no caso de uma tentativa de requisição não ser bem-sucedida,
    ele tentará a cada 3 segundos requisitar novamente a solicitação, após 10 tentativas ele irá informar
    ao usuário que provavelmente a conexão dele pode estar com problemas.

    Obs: O número de tentativas que no caso são 10 não contam com a primeira tentativa, sendo o total de
    11 tentativas.

    O mesmo método também pegará o primeiro file do slide e colocará sua imagem como imagem do banner principal.

    Ele também pegará o primeiro e segundo filme e colocará suas respectivas imagens nas box's 1 e 2 que
    ficam na parte inferior da LP.
  */
  getMovies(): void{
    let headers = {
      'Content-Type': 'application/json'
    }

    this.httpService.get("https://demo3127152.mockable.io/movies", headers)
    .pipe(retryWhen(_ => {
      return interval(3000).pipe(
        flatMap(count => count == 10 ? throwError('Número de tentativas excedido. Verifique sua conexão e tente novamente.') : of(count))
      )
    }))
    .subscribe((data: any) => {
      this.movies = data;
      if(data.length > 0){
        this.current_banner = {
          'image': this.movies[0][this.movie_sizes.banner],
          'title': this.movies[0]['titulo_portugues'],
        };

        this.highlights = [
          {
            'wallpaper': this.movies[0]['wallpaper'],
            'title': this.movies[0]['titulo_portugues'],
          },
          {
            'wallpaper': this.movies[1]['wallpaper'],
            'title': this.movies[1]['titulo_portugues'],
          },
        ];
      }
      this.initializeCarousel();
      this.hide_preload_carousel = true;
    },(error) => {
        if(error == 'Número de tentativas excedido. Verifique sua conexão e tente novamente.'){
          alert(error);
        }
        this.movies = null;
        this.hide_preload_carousel = true;
        console.log(`[[HomeComponent | getMovies]] >> Um erro ocorreu durante o carregamento dos filmes. Descrição do erro: ${error}`);
      }
    );
  }


  /* Esse é o método que detecta o carregamento do carousel. Nele dizemos para o carousel ir para o primeiro
  filme.
  */
  slickInit(e): void{
    try{
      e.slickGoTo(0)
    }catch(error){
      setTimeout(function(){
        e.slickGoTo(0)
      }, 1000)
    }
  }


  /* Esse é o método que detecta quando um item do carousel é selecionado. Ele será o responsável por
  pegar o item selecionado e colocar a imagem desse item no banner principal.
  */
  afterChange(e): void{
    this.current_banner = {
      'image': this.movies[e.currentSlide][this.movie_sizes.banner],
      'title': this.movies[e.currentSlide]['titulo_portugues']
    };
  }


  // Esse é o método que usamos para passar todas as configurações do carousel.
  initializeCarousel(): void{
    this.slideConfig = {
      "arrows": false,
      "dots": true,
      "infinite": true,
      "centerMode": true,
      "centerPadding": '20px',
      "variableWidth": true,
      "slidesToShow": 5,
      "focusOnSelect": true,
      "responsive": [
        {
          "breakpoint": 768,
          "settings": {
            "centerPadding": '40px',
            "slidesToShow": 3
          }
        }
      ]
    } 
  }

  setMetaTag(): void{
    let metatags = [
      {charset: 'UTF-8'},
      {httpEquiv: 'Content-Type', content: 'text/html'},
      {httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1, minimum-scale=1'},
      {name: 'description', content: 'Experimente por 7 dias e assine o Telecine Play. São mais de 1900 filmes para você assistir online. Uma nova experiência de filmes chegou.'},   
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},   
      {name: 'author', content: 'Telecine'},
      {name: 'keywords', content: 'Filmes'},
      {name: 'theme-color', content: '#333'},
      {name: 'application-name', content: 'Assina Telecine Play'},
      {name: 'robots', content: 'index,follow'},
      {property: 'og:url', content: "http://telecine-app.herokuapp.com/"},
      {property: 'og:title', content: "7 dias grátis Telecine Play"},
      {property: 'og:description', content: "Experimente por 7 dias e assine o Telecine Play. São mais de 1900 filmes para você assistir online. Uma nova experiência de filmes chegou."},
      {property: 'og:type', content: "website"},
      {property: 'og:site_name', content: "Assina Telecine Play"},
      {property: 'og:locale', content: "pt_BR"},
      {property: 'og:image', content: "http://telecine-app.herokuapp.com/assets/img/banner_og.png"},
      {property: 'og:image:type', content: "image/png"},
      {property: 'og:image:width', content: "http://telecine-app.herokuapp.com/assets/img/banner_og.png"},
      {property: 'og:image:height', content: "http://telecine-app.herokuapp.com/assets/img/banner_og.png"},
      {name: 'twitter:card', content: 'redetelecine'},
      {name: 'twitter:site', content: 'summary'}
    ];

    for(let metatag of metatags){
      this.seoService.updateMetaTags(metatag)
    }
  }
}
