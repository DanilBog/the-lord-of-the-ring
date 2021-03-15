import { Component, OnInit } from '@angular/core';
import { LordService } from '../lord.service';
import { Quotes } from '../quote';
import { switchMap, mergeMap } from 'rxjs/operators';



@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  quote:Quotes;
  constructor(private lordService: LordService) { }
  displayedColumns: string[] = ['dialog', 'character', 'movie'];
  ngOnInit(): void {
    //console.log('Ответ от API:', this.lordService.getQuote()) ;
    this.getQuotes();
  }
  getQuotes(): void {
    this.lordService.getQuote().pipe(
      switchMap((quote) => this.lordService.getMovie(quote.docs.map(q => q.movie))),
      mergeMap ((quote) => this.lordService.getCharacter(quote.docs.character))
      
    ).subscribe(
      (quote) => {
        this.quote = quote; 
        console.log('Ответ от API:', quote);}
    );
  }


}

