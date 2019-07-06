import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SeoService } from '../../services/Seo/seo.service';
import { HttpService } from '../../services/Http/http.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.sass']
})
export class Step1Component implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  sendgrid_api_key: string = environment.sendgrid_api_key;
  states: any;
  cities: any;
  cities_state: any;
  select_disable: boolean = true;
  cpf_length: boolean = true;
  birthday_length: boolean = true;

  constructor(
    private seoService: SeoService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
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
        email: ['', Validators.required],
        cpf: ['', Validators.required],
        birthday: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getStates(){
    let headers = {
      'Content-Type': 'application/json'
    }

    this.httpService.get("https://demo3127152.mockable.io/states", headers).subscribe((data: any) => {
      this.states = data;
    },(error) => {
        this.states = null;
        console.log(`[[Step1Component | getCities ]] >> Um erro ocorreu durante o carregamento dos estados. Descrição do erro: ${error}`);
      }
    );
  }

  getCities(){
    let headers = {
      'Content-Type': 'application/json'
    }

    this.httpService.get("https://demo3127152.mockable.io/cities", headers).subscribe((data: any) => {
      this.cities = data;
    },(error) => {
        this.cities = null;
        console.log(`[[Step1Component | getCities ]] >> Um erro ocorreu durante o carregamento dos estados. Descrição do erro: ${error}`);
      }
    );
  }

  get f() { return this.loginForm.controls; }

  changeState(e){
    // TODO - Criar o reset do select ao trocar de estado
    if(e == null  || e == undefined || e == ''){
      this.select_disable = true;
    }else{
      let id = e.split(',')[0]
      this.cities_state = this.cities[id];
      this.select_disable = false;
    }
  }

  verify_field_size(size, field):void{
    if(field == 'cpf'){
      field = this.f.cpf.value;

      if((field.length < size && field.length > 0) && this.cpf_length == false){
        this.cpf_length = false
      }else{
        this.cpf_length = true
      }
    }else if(field == 'birthday'){
      field = this.f.birthday.value;

      if((field.length < size && field.length > 0) && this.birthday_length == false){
        this.birthday_length = false
      }else{
        this.birthday_length = true
      }
    }

    
  }

  onSubmit() {
    let state = this.f.state.value.split(',')[1];
    let cpf = this.f.cpf.value;
    let birthday = this.f.birthday.value;
    
    // TODO - Criar validação para quando não for adicionado um email, quando o cpf não for preenchido por completo e para a data de nascimento
    this.submitted = true;

    if(cpf.length < 11 && cpf.length > 0){
      this.cpf_length = false
    }

    if(birthday.length < 8 && birthday.length > 0){
      this.birthday_length = false
    }

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

    console.log(this.f.state)
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
