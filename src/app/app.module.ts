import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { QuoteComponent } from './quote/quote.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    QuoteComponent,

  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
