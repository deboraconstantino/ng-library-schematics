import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgConstModule } from '@const-developer/ng-const';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgConstModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
