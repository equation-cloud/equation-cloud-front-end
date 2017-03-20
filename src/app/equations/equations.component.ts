import { Component, OnInit } from '@angular/core';
import { MathJaxDirective } from '../mathjax.directive';
import { ParserService } from '../equation/parser.service';
import { EquationService } from '../equation/equation.service';
import { Equation } from '../equation/equation';

@Component({
  selector: 'app-equations',
  templateUrl: './equations.component.html',
  styleUrls: ['./equations.component.css'],
  providers: [ParserService, EquationService]
})
export class EquationsComponent implements OnInit {
  inputString = '';
  equation = null;

  constructor(
    private equationService : EquationService
  ) { }

  ngOnInit() {
  }

  updateEquation()
  {
    if (/\S/.test(this.inputString))
    {
      // String is not empty and not just whitespace
      this.equation = this.equationService.createEquationFromString(this.inputString);
    }
    else
    {
      this.inputString = '';
      this.equation = null;
    }
  }

}
