import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EquationListComponent } from './equation-list/equation-list.component';
import { EquationDetailComponent } from './equation-detail/equation-detail.component';
import { MathJaxDirective } from './math-jax.directive';
import { ClipboardModule } from 'ngx-clipboard';
import { EquationsRoutingModule } from './equations-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClipboardModule,
    EquationsRoutingModule
  ],
  declarations: [
    EquationListComponent,
    EquationDetailComponent,
    MathJaxDirective
  ]
})
export class EquationsModule { }
