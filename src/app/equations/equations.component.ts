import { Component, ElementRef, Inject, Renderer, OnInit } from '@angular/core';
import { MathJaxDirective } from '../mathjax.directive';
import { ParserService } from '../equation-compiler/parser.service';
import { EquationService } from '../equation-compiler/equation.service';
import { Equation } from '../equation-compiler/equation';

@Component({
  selector: 'app-equations',
  templateUrl: './equations.component.html',
  styleUrls: ['./equations.component.css'],
  providers: [ParserService, EquationService]
})
export class EquationsComponent implements OnInit {
  inputString = '';
  equation = null;
  elementRef: ElementRef;

  constructor(
    private equationService : EquationService,
    @Inject(ElementRef) elementRef: ElementRef,
    private renderer: Renderer
  ) {
    this.elementRef = elementRef;
  }

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

  setVariableHighlights(ids: string[], showHighlight: boolean)
  {
    for (let id of ids)
    {
      let variableElement = this.elementRef.nativeElement.querySelector('#' + id);

      if (showHighlight)
      {
        this.renderer.setElementStyle(variableElement, 'text-shadow', '0px 0px 10px firebrick');
      }
      else
      {
        this.renderer.setElementStyle(variableElement, 'text-shadow', 'none');
      }
    }
  }

}
