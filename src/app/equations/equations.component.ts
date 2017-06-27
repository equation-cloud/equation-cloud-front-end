import { Component, ElementRef, Inject, Renderer, OnInit } from '@angular/core';
import { MathJaxDirective } from '../mathjax.directive';
import { Expression, Variable, generateRawTeX, generateDecoratedTeX } from 'ecca';

@Component({
  selector: 'app-equations',
  templateUrl: './equations.component.html',
  styleUrls: ['./equations.component.css']
})
export class EquationsComponent implements OnInit {
  inputString : string = '';
  expression : Expression;
  rawTeX : string;
  decoratedTeX : string;
  elementRef: ElementRef;

  constructor(
    @Inject(ElementRef) elementRef: ElementRef,
    private renderer: Renderer
  ) {
    this.elementRef = elementRef;
  }

  ngOnInit() {
  }

  updateEquation() {
    if (/\S/.test(this.inputString)) {
      // String is not empty and not just whitespace, generate an Expression from it
      this.expression = new Expression(this.inputString);

      // Generate the raw and decorated TeX from the Expression
      this.rawTeX = generateRawTeX(this.expression);
      this.decoratedTeX = generateDecoratedTeX(this.expression);
    } else {
      // String cannot be used to generate an Expression, clear related member variables
      this.inputString = '';
      this.expression = null;
      this.rawTeX = '';
      this.decoratedTeX = '';
    }
  }

  setVariableHighlights(variable: Variable, showHighlight: boolean) {
    if (variable.instances.length > 0) {
      // Repeat for each instance of the the specified variable
      for (let identifierElement of variable.instances) {
        // Get a reference to the DOM node for the instance of the variable
        let variableElement = this.elementRef.nativeElement.querySelector('#' + identifierElement.id);

        // Either set or clear the 'text-shadow' property on the DOM node
        if (showHighlight) {
          this.renderer.setElementStyle(variableElement, 'text-shadow', '0px 0px 10px firebrick');
        } else {
          this.renderer.setElementStyle(variableElement, 'text-shadow', 'none');
        }
      }
    }
  }

}
