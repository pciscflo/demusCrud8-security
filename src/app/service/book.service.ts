import { environment } from './../../environments/enviroment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../model/book';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = `${base_url}`
  private listaCambio = new Subject<Book[]>()


  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Book[]>(this.url+"/books");
  }
  insert(book: Book) {
    return this.http.post(this.url+"/book", book);
  }
  setList(listaNueva: Book[]) {
    this.listaCambio.next(listaNueva);
  }
  getLista() {
    return this.listaCambio.asObservable();
  }

}
