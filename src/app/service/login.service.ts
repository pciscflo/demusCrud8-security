import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { Author } from '../model/authors';
import { Credentials } from '../model/credentials';
import {map} from 'rxjs/operators';

const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private url = `${baseUrl}`;//alt+96
  private httpHeaders = new HttpHeaders({'Access-Control-Allow-Origin': 'http://localhost:8080/api'});
  constructor(private http:HttpClient) { } //inyectar httpClient

  private listaCambio = new Subject<Author[]>();

  login(creds: Credentials)
  {
      return this.http.post('http://localhost:8080/authenticate', creds, {
        observe:'response'
      }).pipe(map((response: HttpResponse<any>) => {
        const body = response.body;
        const headers = response.headers;
        const bearerToken = headers.get('Authorization')!;
        console.log(headers.get('Authorization')!);
        const token = bearerToken.replace('Bearer ', '');
        console.log(token);
        localStorage.setItem('token', token);
        return body;

      }));
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
