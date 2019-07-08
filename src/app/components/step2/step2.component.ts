import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Serviço próprios do projeto
import { SeoService } from '../../services/Seo/seo.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.sass']
})
export class Step2Component implements OnInit {
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private seoService: SeoService
  ){
    this.seoService.setTitlePage('Assina Telecine - Obrigado por experimentar');
    this.setMetaTag();
    this.validate_step2();
  }

  ngOnInit() {
  }

  /*
  Usamos esse método para verificar se o usuário está acessando essa página por url ou se foi o formulário
  da página /experimentar que o trouxe aqui. Só poderá ver essa página que tiver vindo pelo onsubmit
  que ocorre na página /experimentar.
  */
  validate_step2(): void{
    this.route.queryParams.subscribe(params => {
      if(!params['step2_enabled']){
        this.router.navigateByUrl('/')
      }
    });
  }

  setMetaTag(): void{
    let metatags = [
      {charset: 'UTF-8'},
      {httpEquiv: 'Content-Type', content: 'text/html'},
      {httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1, minimum-scale=1'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},   
      {name: 'robots', content: 'noindex'},
      {name: 'robots', content: 'googlebot'}
    ];

    for(let metatag of metatags){
      this.seoService.updateMetaTags(metatag)
    }
  }

}
