import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, interval, throwError, of } from 'rxjs';
import { retryWhen, flatMap } from 'rxjs/operators'

import { SeoService } from '../../services/Seo/seo.service';
import { HttpService } from '../../services/Http/http.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.sass']
})
export class Step1Component implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  states: any;
  cities: any;
  cities_state: any;

  // Boleanos que realizam verificação no component html
  submitted: boolean = false;
  select_state_disable: boolean = true;
  select_city_disable: boolean = true;
  hide_preload_state: boolean = false;
  hide_preload_city: boolean = true;
  connection_lost: boolean = false;

  constructor(
    private seoService: SeoService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.setMetaTag();
  }

  ngOnInit() {
    this.initForm();
    this.getStates();
    this.getCities();
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)]],
        cpf: ['', [Validators.required, Validators.pattern(/^\w{11,11}$/)]],
        birthday: ['', [Validators.required, Validators.pattern(/^\w{8,8}$/)]],
        city: ['', Validators.required],
        state: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getStates(){
    let headers = {
      'Content-Type': 'application/json'
    }

    this.httpService.get("https://demo3127152.mockable.io/states", headers)
    .pipe(retryWhen(_ => {
      return interval(3000).pipe(
        flatMap(count => count == 10 ? throwError('Número de tentativas excedido. Verifique sua conexão e tente novamente.') : of(count))
      )
    }))
    .subscribe((data: any) => {
      this.states = data;
      this.hide_preload_state = true
      this.select_state_disable = false
    },(error) => {
        this.states = null;
        this.hide_preload_state = true

        if(error == 'Número de tentativas excedido. Verifique sua conexão e tente novamente.' && !this.connection_lost){
          alert(error)
          this.connection_lost = true
        }else if(!this.connection_lost){
          alert('Um erro ocorreu ao tentar carregar os estados.')
        }
        console.log(`[[Step1Component | getCities ]] >> Um erro ocorreu durante o carregamento dos estados. Descrição do erro: ${error}`);
      }
    );
  }

  getCities(){
    let headers = {
      'Content-Type': 'application/json'
    }

    this.httpService.get("https://demo3127152.mockable.io/cities", headers)
    .pipe(retryWhen(_ => {
      return interval(3000).pipe(
        flatMap(count => count == 10 ? throwError('Número de tentativas excedido. Verifique sua conexão e tente novamente.') : of(count))
      )
    }))
    .subscribe((data: any) => {
      this.cities = data;
    },(error) => {
        this.cities = null;

        if(error == 'Número de tentativas excedido. Verifique sua conexão e tente novamente.' && !this.connection_lost){
          alert(error)
          this.connection_lost = true
        }else if(!this.connection_lost){
          alert('Um erro ocorreu ao tentar carregar os estados.')
        }
        console.log(`[[Step1Component | getCities ]] >> Um erro ocorreu durante o carregamento dos estados. Descrição do erro: ${error}`);
      }
    );
  }

  get f() { return this.loginForm.controls; }

  changeState(e){
    this.hide_preload_city = false;

    if(e == null  || e == undefined || e == ''){
      this.select_city_disable = true;
      alert("Erro ao carregar cidades.")
    }else{
      let id = e.split(',')[0]
      this.cities_state = this.cities[id];
      this.select_city_disable = false;
    }

    this.hide_preload_city = true;
  }

  onSubmit() {
    let state: string = this.f.state.value.split(',')[1];
    let cpf: string = this.f.cpf.value;
    let birthday: string = this.f.birthday.value;

    // Formatação do birthday para 00/00/0000, pois a máscara do front-end não preserva as barras/
    birthday = `${birthday[0]}${birthday[1]}/${birthday[2]}${birthday[3]}/${birthday[4]}${birthday[5]}${birthday[6]}${birthday[7]}`;
    
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

    console.log({
      'name': this.f.name.value,
      'email': this.f.email.value,
      'cpf': cpf,
      'birthday': birthday,
      'state': state,
      'city': this.f.city.value
    })
    this.router.navigate(['/step2'], { queryParams:  { step2_enabled: true }, skipLocationChange: true});
  }

  setMetaTag(): void{
    let metatags = [
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

    for(let metatag of metatags){
      this.seoService.updateMetaTags(metatag)
    }
  }
}
