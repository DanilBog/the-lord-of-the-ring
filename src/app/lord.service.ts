import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quotes } from './quote';

@Injectable({
  providedIn: 'root'
})
export class LordService {
  //urlQuote = 'https://the-one-api.dev/v2/quote?page=1&limit=5';
  urlQuote = 'https://the-one-api.dev/v2/quote?page=';
  urlMovie = 'https://the-one-api.dev/v2/movie/';
  urlCharacter = 'https://the-one-api.dev/v2/character/';
  constructor(private http: HttpClient ) {}


  getQuote(page:string): Observable <Quotes>{
    //console.log('Ответ от https://the-one-api.dev/v2/quote/1');
    const url = this.urlQuote + page + '&limit=10';
    return this.http.get<Quotes>(url);
  }

  getMovie(movie:number): Observable <any> {
    const url = this.urlMovie + movie;

    return this.http.get<any>(url);
  }

  getCharacter(character:number): Observable <any> {
    const url = this.urlCharacter + character;

    return this.http.get<any>(url);
  }


}
