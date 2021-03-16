import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quotes } from './quote';

@Injectable({
  providedIn: 'root'
})
export class LordService {
  // urlQuote = 'https://the-one-api.dev/v2/quote?page=1&limit=5';
  urlQuote = 'https://the-one-api.dev/v2/quote?page=';
  urlMovie = 'https://the-one-api.dev/v2/movie?';
  urlCharacter = 'https://the-one-api.dev/v2/character/';
  constructor(private http: HttpClient ) {}


  getQuote( page: number, movie: string ): Observable <Quotes>{
    // console.log('Ответ от https://the-one-api.dev/v2/quote/1');
    let url;
    if (movie == 'all'){
      page++;
      url = this.urlQuote + page + '&limit=5';
    }
    else {
      page++;
      url = 'https://the-one-api.dev/v2/movie/' + movie + '/quote?page=' + page + '&limit=5' ;
    }
    
    
    return this.http.get<Quotes>(url);
  }

  getMovie(): Observable <any> {
    // const url = this.urlMovie;
    //console.log('Array of movie:', movie);
    // let idToMovie = movie.map(id => {const url = this.urlMovie + id; this.http.get<any>(url)});
    return this.http.get<any>(this.urlMovie);
  }

  getCharacter(char: string): Observable <any> {
    // const url = this.urlCharacter + character;
    const url = this.urlCharacter + char;
    return this.http.get<any>(url);
  }


}
