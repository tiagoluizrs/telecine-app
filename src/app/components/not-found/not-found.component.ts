import { Component, OnInit } from '@angular/core';

// Serviços
import { SeoService } from '../../services/Seo/seo.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private seoService: SeoService
  ) { 
    this.seoService.setTitlePage('Assina Telecine - Página não encontrada');
    this.setMetaTag();
  }

  ngOnInit() {
  }

  setMetaTag(): void{
    let metatags = [
      {charset: 'UTF-8'},
      {httpEquiv: 'Content-Type', content: 'text/html'},
      {httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1, minimum-scale=1'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},   
      {name: 'author', content: 'Telecine'},
      {name: 'theme-color', content: '#333'},
      {name: 'robots', content: 'noindex'},
    ];  
  }

}
