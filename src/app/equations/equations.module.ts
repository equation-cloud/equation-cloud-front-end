import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquationsRoutingModule } from './equations-routing.module';
import { EquationListComponent } from './equation-list/equation-list.component';
import { EquationDetailComponent } from './equation-detail/equation-detail.component';

@NgModule({
  imports: [
    CommonModule,
    EquationsRoutingModule
  ],
  declarations: [EquationListComponent, EquationDetailComponent]
})
export class EquationsModule { }
