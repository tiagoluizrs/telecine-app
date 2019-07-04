import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = 'https://demo3127152.mockable.io';
  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) { 
    this.headers.set('Content-Type', 'application/json');
  }

  setHeaders(key, val){
    this.headers.set(key, val);
  }

  get(end_point: string): Observable<any> {
    try{
      return this.http.get(`${this.url}/${end_point}`);
    } catch(error){
      console.log(`[[HttpService | getData]] >> Um erro ocorreu durante o carregamento dos filmes. Descrição do erro: ${error}`);
      return null
    }
  }
}
