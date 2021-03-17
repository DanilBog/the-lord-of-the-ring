import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LordService } from '../lord.service';
import { Quotes, Quote, Movie } from '../quote';
import { switchMap, map, startWith, filter } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { merge, Observable } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MatSelect, MatSelectChange } from '@angular/material/select';

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
  PagedIssues: Observable<Quote[]>;
  resultsLength = 0;
  movie: Movie[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('movieSelect') selector: MatSelect;
  // Нужно добавить чайлд селектор и отслеживать изменение его состояния
  // Далее this.PagedIssues = merge( this.selector.selectionChange, this.paginator.page)
  // отслеживаем события от селектора и пагинатора

  ngAfterViewInit(): void {
    this.PagedIssues = merge(this.selector.selectionChange, this.paginator.page).pipe(
      startWith({}),
      switchMap( (event) => {
        // если событие пришло от селектора, значит выбран новый фильм => обнуляем номер страницы, выводим список цитат с первой
        if ((event as MatSelectChange)?.value) { this.paginator.pageIndex = 0; }
        return this.lordService.getQuote(this.paginator.pageIndex, this.selected); }),
      switchMap((quote) => {
        // создаем массив char состоящий из id персонажей
        const char = quote.docs.map(item => item.character);
        // из forkJoin получим массив[5] объектов, в которых есть имена персонажей ch[0-4].docs[0].name
        return forkJoin(
          char.map(item => this.lordService.getCharacter(item))   // массив запросов к getCharacter
          ).pipe(
            // обрабатывем цитаты подставляя вместо id имя персонажа
            map( (nameOfChar) => {
              quote.docs.forEach(item => {
              const ch = nameOfChar.find( character => character.docs[0]._id === item.character);
              item.character = ch.docs[0].name; });
              return quote;
            }));
      }),
      map((quote) =>  {
        quote.docs.forEach(item => {
          const m = this.movie.find( mov => mov._id === item.movie ); // в m.name название фильма
          item.movie = m.name;      // переписываем цифровое значение на название фильма
        });
        return quote;
      }),
      map(quotes => {
        this.resultsLength = quotes.pages;
        return quotes.docs; })
    );
  }

ngOnInit(): void {
  this.lordService.getMovie().subscribe(
    movie => this.movie = movie.docs
  );
}
}
