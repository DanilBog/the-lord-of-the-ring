import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LordService } from '../lord.service';
import { Quotes, Quote } from '../quote';
import { switchMap, mergeMap } from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit, AfterViewInit {
  quote:Quotes;
  constructor(private lordService: LordService) { }
  displayedColumns: string[] = ['_id', 'character',  'dialog', 'movie'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngAfterViewInit() {
    
  }


  ngOnInit(): void {
    //console.log('Ответ от API:', this.lordService.getQuote()) ;
    this.lordService.getQuote('1').subscribe(
      (quote) => {
        this.quote = quote; 
        console.log('Ответ от API:', quote);
        this.dataSource = new MatTableDataSource<Quote>(quote.docs);
        console.log('quote.docs', quote.docs);
        this.dataSource.paginator = this.paginator;
        console.log('paganition', this.paginator);}
    );
  }
  
  getQuotes(): void {
    this.lordService.getQuote('1').pipe(
      //switchMap((quote) => this.lordService.getMovie(quote.docs.map(q => q.movie))),
     // mergeMap ((quote) => this.lordService.getCharacter(quote.docs.character))
      
    ).subscribe(
      (quote) => {
        this.quote = quote; 
        console.log('Ответ от API:', quote);}
    );
  }


}

