import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { Author } from '../model/authors';

const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private url = `${baseUrl}`;//alt+96
  private httpHeaders = new HttpHeaders({'Access-Control-Allow-Origin': 'http://localhost:8080/api'});
  constructor(private http:HttpClient) { } //inyectar httpClient
  private listaCambio = new Subject<Author[]>();


  list():Observable<any>{
    console.log(this.url+"/authors");
    return this.http.get<Author[]>(this.url+"/authors");
    //return this.http.get<Author[]>(this.url+"/authors", { 'headers': this.httpHeaders });
  }

  insert(author : Author){
     return this.http.post(this.url+"/author", author);
  }
  delete(id:string){
    return this.http.delete(this.url + "/author/" + id);
  }
  listId(id:number){
    console.log("ListId:"+ `${this.url+"/author"}/${id}`)
    return this.http.get<Author>(`${this.url+"/author"}/${id}`);
  }
  listName(name:string){
    console.log("ListName:"+ `${this.url+"/authors"}/${name}`)
    return this.http.get<Author[]>(`${this.url+"/authors"}/${name}`);
  }
  update(aut: Author){
    return this.http.put(this.url+"/author", aut);
  }

  setList(listaNueva: Author[]) {
    this.listaCambio.next(listaNueva);
  }
  getLista() {
    return this.listaCambio.asObservable();
  }

}
