import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/Seo/seo.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.sass']
})
export class Step2Component implements OnInit {

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
      {name: 'robots', content: 'NOINDEX'},
      {name: 'author', content: 'Telecine'},
      {httpEquiv: 'Content-Type', content: 'text/html'},
      {property: 'og:type', content: "website"},
      {charset: 'UTF-8'}
    ];

    this.seoService.setMetaTag(data, true);
  }

}
