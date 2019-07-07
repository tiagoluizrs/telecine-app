import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SeoService } from '../../services/Seo/seo.service';
import { HttpService } from '../../services/Http/http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit, AfterViewInit {
  defaultBanner: string = '/assets/img/defaultBanner.png';
  defaultBox: string = '/assets/img/defaultBox.png';
  movies: Observable<Array<any>>;
  slideConfig: any;
  window_size: number;
  current_banner: any = {
    'image': null,
    'title': null,
  };
  highlights: any = [
    {
      'wallpaper': null,
      'title': null
    },
    {
      'wallpaper': null,
      'title': null
    },
  ];
  movie_sizes: any = {  banner: 'hero3x1' };

  constructor(
    private seoService: SeoService,
    private httpService: HttpService,
    private cdr: ChangeDetectorRef
  ){
    this.setMetaTag();
    this.configure_sizes();
    this.getMovies();
  } 

  ngOnInit() {
    setInterval(() => {
      this.cdr.detectChanges();
    }, 2000);
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  configure_sizes(): void{
    this.window_size = window.innerWidth;

    if(this.window_size > 768){
      this.movie_sizes.banner = 'hero3x1';
    }else if(this.window_size < 768 && this.window_size > 360){
      this.movie_sizes.banner = 'hero3x1';
    }else{
      this.movie_sizes.banner = 'hero4x3';
    }
  }

  getMovies(): void{
    let headers = {
      'Content-Type': 'application/json'
    }

    this.httpService.get("https://demo3127152.mockable.io/movies", headers).subscribe((data: any) => {
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
    },(error) => {
      this.movies = null;
        console.log(`[[HomeComponent | getMovies]] >> Um erro ocorreu durante o carregamento dos filmes. Descrição do erro: ${error}`);
      }
    );
  }

  setMetaTag(): void{
    let metatags = [
      {name: 'description', content: 'No Telecine Play você encontra, com exclusividade, filmes premiados dos maiores estúdios de Hollywood e o melhor do cinema nacional, disponíveis para os assinantes dos 6 canais da Rede Telecine. São mais de 1.500 filmes para assistir a qualquer hora no computador, smartphone, tablet, Smart TV e Xbox One.'},   
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},   
      {name: 'robots', content: 'INDEX, FOLLOW'},
      {name: 'author', content: 'Telecine'},
      {name: 'keywords', content: 'AXIS'},
      {httpEquiv: 'Content-Type', content: 'text/html'},
      {property: 'og:title', content: "Assista filmes online onde você quiser pelo Telecine Play"},
      {property: 'og:type', content: "website"},
      {charset: 'UTF-8'}
    ];

    for(let metatag of metatags){
      this.seoService.updateMetaTags(metatag)
    }
  }

  slickInit(e): void{
    try{
      e.slickGoTo(0)
    }catch(error){
      setTimeout(function(){
        e.slickGoTo(0)
      }, 1000)
      console.log(`[[HomeComponent | slickInit]] >> Um erro ocorreu no momento em que o item 0 do carousel foi ativado. Descrição do erro: ${error}`);
    }
  }

  afterChange(e): void{
    this.current_banner = {
      'image': this.movies[e.currentSlide][this.movie_sizes.banner],
      'title': this.movies[e.currentSlide]['titulo_portugues']
    };
  }

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
}
