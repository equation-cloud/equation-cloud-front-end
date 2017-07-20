import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AppReadyEventService } from './app-ready-event.service';
import { ClipboardModule } from 'ngx-clipboard';
import { FooterComponent } from './footer/footer.component';
import { EquationsRoutingModule } from './equations/equations-routing.module';
import { EquationsModule } from './equations/equations.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
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
    AppReadyEventService,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
