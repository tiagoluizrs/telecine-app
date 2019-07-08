import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient
  ) {}

  /* Método para realizar uma requisição get
    Para funcionar você precisará passar os seguintes parâmetros:
      - url: Uma string com a url que será requisitada;
      - header: Um objeto json com os itens que precisam estar no cabeçalho.
    
    Exemplos:
    url = 'sua url'
    headers = { 'Content-Type': 'application/json' }

    Ela retornará um objeto de tipo Observable que poderá ser recebido
    por uma variável de tipo Observable ou any. 
  */
  get(url: string, headers: any): Observable<any> {
    let header_object = new HttpHeaders(headers);

    try{
      return this.http.get(`${url}`, {headers: header_object});
    } catch(error){
      console.log(`[[HttpService | get]] >> Um erro ocorreu durante este get. Descrição do erro: ${error}`);
      return null
    }
  }
}
