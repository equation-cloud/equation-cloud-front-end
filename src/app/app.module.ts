import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EquationsModule } from './equations/equations.module';
import { NavComponent } from './nav/nav.component';
import { AppReadyEventService } from './app-ready-event.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    EquationsModule,
    AppRoutingModule
  ],
  providers: [
    AppReadyEventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
