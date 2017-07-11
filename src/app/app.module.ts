import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MathJaxDirective } from './mathjax.directive';
import { EquationsComponent } from './equations/equations.component';
import { AppReadyEventService } from './app-ready-event.service';
import { ClipboardModule } from 'ngx-clipboard';
import { FooterComponent } from './footer/footer.component';
import { EquationsRoutingModule } from './equations/equations-routing.module';
import { EquationsModule } from './equations/equations.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MathJaxDirective,
    EquationsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClipboardModule,
    EquationsRoutingModule,
    EquationsModule
  ],
  providers: [
    AppReadyEventService
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
