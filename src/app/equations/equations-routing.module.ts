import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquationListComponent } from './equation-list/equation-list.component';
import { EquationDetailComponent } from './equation-detail/equation-detail.component';

const routes: Routes = [
  { path: 'equations',  component: EquationListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquationsRoutingModule { }
