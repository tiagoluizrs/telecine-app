import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, throwError, of } from 'rxjs';
import { retryWhen, flatMap } from 'rxjs/operators'

// Serviços próprios do projeto
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
    this.seoService.setTitlePage('Assina Telecine - Experimentar');
    this.setMetaTag();
  }

  ngOnInit() {
    this.initForm();
    this.getStates();
    this.getCities();
  }



  /* Método que usamos para inicializar nosso grupo de itens do formulário.
    Nele passamos as validações de required dos campos e patterns quando houverem.

    Patterns:
    E-mail: Foi adicionado uma exigência no campo de e-mail para que contenha o formado de e-mail. Ex: email@email.com
    CPF: No CPF foi adicionado a exigência de ter exatamente 11 números.
    Birthday: Na data de nascimento foi adicionado a exigência de ter exatamente 8 dígitos.

    Esses patterns forçam o usuário a preecher os dados corretamente, além dos patterns o html também possui
    máscaras que auxiliam o usuário no momento do preenchimento.
  */
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



  /*
    Método que usamos para pegar os estados do brasil.
    Formato do dado retornado.
    Um array com vários objetos dentro: [{ "id": 1, "initials": "AC", "name": "Acre"}, ...]

    O método possui o retryWhen que no caso de uma tentativa de requisição não ser bem-sucedida,
    ele tentará a cada 3 segundos requisitar novamente a solicitação, após 10 tentativas ele irá informar
    ao usuário que provavelmente a conexão dele pode estar com problemas.

    Obs: O número de tentativas que no caso são 10 não contam com a primeira tentativa, sendo o total de
    11 tentativas.
  */
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



  /*
    Não diferente do método getStates, esse é o método que vai até a api e pega todas as cidades 
    do Brasil.
    
    Formato do dado retornado.
    Um objeto com várias chaves, cada chave representa o id de um estado: { "1": [ "Acrelândia", "Assis Brasil", ...], ...}
    e o valor que cada chave recebe é um array com as cidades desse estado.

    O comportamente de retryWhen dele é idêntico ao do anterior.
  */
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



  /*
    Método get que usamos para pegar um valor specífico do formulário.
    Exemplo:
    Ao invés de fazermos 
    this.loginForm.controls.name.value
    
    Com esse método precisaremos fazer apenas.
    this.f.name.value
    A legibilidade fica bem melhor.
  */
  get f() { return this.loginForm.controls; }



  /*
    Aqui é o local onde pegamos o estado selecionado e montamos o select da cidade com apenas as cidades
    daquele estado.

    No html passamos no valor do select de estado o id e o nome do estado separados por vírgula.
    
    Chegando no método changeState usamos o split para pegar a primeira posição que é o id e assim
    conseguimos acessar a variável de cidades (this.cities) para pegar baseado nesse id uma chave dela
    contendo as cidades referentes aquele estado, assim montamos nosso select de cidades.
  */
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



  /*
    Aqui é onde realizamos o submit (Lembrando que nesse momento não há um envio dele por método post).

    Os dados são capturados, alguns deles como birthday passam por uma formatação, mas nada difícil.

    Esse método captura os valores preenchidos no formulário e se todos os dados forem preenchidos
    corretamente ele estará apto para realizar o submit que levará o usuário para a pŕoxima página que é
    a step2, uma página de mensagem onde o usuário terá a confirmação do cadastro.

    Obs: Por hora para confirmar que os dados forma confirmados corretamente existe um console.log que
    realiza um print no console do navegador mostrando os dados capturados.
  */
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
    this.router.navigate(['/cadastro-concluido'], { queryParams:  { step2_enabled: true }, skipLocationChange: true});
  }

  setMetaTag(): void{
    let metatags = [
      {charset: 'UTF-8'},
      {httpEquiv: 'Content-Type', content: 'text/html'},
      {httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1, minimum-scale=1'},
      {name: 'description', content: 'Experimente por 7 dias e assine o Telecine Play. São mais de 1900 filmes para você assistir online. Uma nova experiência de filmes chegou.'},   
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},   
      {name: 'author', content: 'Telecine'},
      {name: 'theme-color', content: '#333'},
      {name: 'application-name', content: 'Assina Telecine Play'},
      {name: 'robots', content: 'index,follow'},
      {property: 'og:url', content: "http://telecine-app.herokuapp.com/experimentar"},
      {property: 'og:title', content: "7 dias grátis Telecine Play - Experimentar"},
      {property: 'og:description', content: "Experimente por 7 dias e assine o Telecine Play. São mais de 1900 filmes para você assistir online. Uma nova experiência de filmes chegou."},
      {property: 'og:type', content: "website"},
      {property: 'og:site_name', content: "Assina Telecine Play"},
      {property: 'og:locale', content: "pt_BR"},
      {property: 'og:image', content: "http://telecine-app.herokuapp.com/assets/img/banner_og.png"},
      {name: 'twitter:card', content: 'redetelecine'},
      {name: 'twitter:site', content: 'summary'}
    ];  

    for(let metatag of metatags){
      this.seoService.updateMetaTags(metatag)
    }
  }
}
