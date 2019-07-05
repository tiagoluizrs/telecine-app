import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SeoService } from '../../services/Seo/seo.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.sass']
})
export class Step1Component implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private seoService: SeoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ){
  }

  ngOnInit() {
    this.setMetaTag()
    this.initForm()
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        cpf: ['', Validators.required],
        birthday: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

    console.log(this.f)
    // this.f.field.value
  }

  setActive(e): void{
    console.log(e)
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
