import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/Seo/seo.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.sass']
})
export class Step1Component implements OnInit {

  constructor(
    private seoService: SeoService
  ){
    this.setMetaTag()
  }

  ngOnInit() {
  }

  setMetaTag(): void{
    let data = [
      {name: 'description', content: 'Experimente por 7 dias e assine o Telecine Play. São mais de 1900 filmes para você assistir online. Uma nova experiência de filmes chegou.'},   
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},   
      {name: 'robots', content: 'INDEX, FOLLOW'},
      {name: 'author', content: 'Telecine'},
      {name: 'keywords', content: 'AXIS'},
      {httpEquiv: 'Content-Type', content: 'text/html'},
      {property: 'og:title', content: "7 dias grátis Telecine Play"},
      {property: 'og:type', content: "website"},
      {charset: 'UTF-8'}
    ];

    this.seoService.setMetaTag(data, true);
  }
}
