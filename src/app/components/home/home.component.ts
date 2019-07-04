import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/Seo/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  constructor(
    private seoService: SeoService
  ){
    this.setMetaTag()
  } 

  ngOnInit() {
  }

  setMetaTag(): void{
    let data = [
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

    this.seoService.setMetaTag(data, true);
  }
}
