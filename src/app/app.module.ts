import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MathJaxDirective } from './mathjax.directive';
import { EquationsComponent } from './equations/equations.component';
import { AppReadyEventService } from './app-ready-event.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MathJaxDirective,
    EquationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AppReadyEventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
