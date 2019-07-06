import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
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
    this.setMetaTag();
    this.validate_step2();
  }

  ngOnInit() {
  }

  validate_step2(): void{
    this.route.queryParams.subscribe(params => {
      if(!params['step2_enabled']){
        this.router.navigateByUrl('/')
      }
    });

    // this.step2_enabled = this.route.queryParamMap.pipe(map(params => params.get('step2_enabled') || 'None'));
  }

  setMetaTag(): void{
    let metatags = [
      {name: 'description', content: 'Experimente por 7 dias e assine o Telecine Play. São mais de 1900 filmes para você assistir online. Uma nova experiência de filmes chegou.'},   
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},   
      {name: 'robots', content: 'NOINDEX'},
      {name: 'author', content: 'Telecine'},
      {httpEquiv: 'Content-Type', content: 'text/html'},
      {property: 'og:type', content: "website"},
      {charset: 'UTF-8'}
    ];

    for(let metatag of metatags){
      this.seoService.updateMetaTags(metatag)
    }
  }

}
