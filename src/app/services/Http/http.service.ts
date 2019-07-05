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
