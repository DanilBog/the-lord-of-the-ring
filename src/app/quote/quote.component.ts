import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LordService } from '../lord.service';
import { Quotes, Quote, Movie } from '../quote';
import { switchMap, mergeMap, map, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MatSelect } from '@angular/material/select';



@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent implements OnInit, AfterViewInit {
  selected = 'all';
  quote: Quotes;
  constructor(private lordService: LordService) { }
  displayedColumns: string[] = ['character',  'dialog', 'movie'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // dataSource = new MatTableDataSource<Quote>([]);
  PagedIssues: Observable<Quote[]>;
  resultsLength = 0;
  movie: Movie[];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  @ViewChild('movieSelect') selector: MatSelect; // Нужно добавить чайлд селектор и отслеживать изменение его состояния
   // Далее this.PagedIssues = merge( this.selector.selectionChange, this.paginator.page)
    
  ngAfterViewInit(): void {
    this.PagedIssues = merge(this.selector.selectionChange, this.paginator.page).pipe(
      startWith({}),
      switchMap( () => this.lordService.getQuote(this.paginator.pageIndex, this.selected)),
      map((quote) => {//const char = of(quote.docs)  
                      const char = quote.docs.map(item => item.character);
                     // const char = quote.docs.map(item => this.lordService.getCharacter(item.character));
                      console.log('Array char from quote.docs:', char);
                      this.lordService.getCharacter(char[0]).subscribe(
                        (m) => console.log('Данные от getCharacter',m.docs[0].name)
                      );
                      console.log
                      
                      forkJoin({
                       1: this.lordService.getCharacter(char[4]),
                      }).subscribe(console.log);
                      



                      return quote;
      }),
      map((quote) =>  {
        quote.docs.forEach(item => {
          const m = this.movie.find( mov => mov._id === item.movie ); // в m.name название фильма
          item.movie = m.name;      // переписываем цифровое значение на название фильма 
        });
        return quote;
      }),
      map(quotes =>{
        console.log('quotes.docs', quotes.docs);
        this.resultsLength = quotes.pages;
        return quotes.docs; })
    );

    
    /*this.lordService.getQuote('1').subscribe(
      (quote) => {
        this.quote = quote;
        console.log('Ответ от API:', quote);
        this.dataSource.filteredData = quote.docs;
        console.log('quote.docs', quote.docs);
        this.dataSource.paginator = this.paginator;
        console.log('paganition', this.paginator); }
    );*/
  }


  ngOnInit(): void {
    this.lordService.getMovie().subscribe(
      movie => {
        this.movie = movie.docs;
        console.log('Movie List:', this.movie ); }
        );
    this.lordService.getCharacter('5cd99d4bde30eff6ebccfe9e').subscribe(
      char => console.log('Character List:', char)
        );

  }
  /*
  getQuotes(): void {
    this.lordService.getQuote(1).pipe(
      // switchMap((quote) => this.lordService.getMovie(quote.docs.map(q => q.movie))),
     // mergeMap ((quote) => this.lordService.getCharacter(quote.docs.character))

    ).subscribe(
      (quote) => {
        this.quote = quote;
        console.log('Ответ от API:', quote); }
    );
  }*/


}
