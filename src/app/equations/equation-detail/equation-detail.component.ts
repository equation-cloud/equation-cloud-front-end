import { Component, ElementRef, Inject, Renderer, OnInit } from '@angular/core';
import { MathJaxDirective } from '../math-jax.directive';
import { Expression, Variable, generateRawTeX, generateDecoratedTeX } from 'ecca';

@Component({
  selector: 'app-equation-detail',
  templateUrl: './equation-detail.component.html',
  styleUrls: ['./equation-detail.component.css']
})
export class EquationDetailComponent implements OnInit {
  inputString : string = '';
  expression : Expression;
  rawTeX : string;
  decoratedTeX : string;
  elementRef : ElementRef;
  showOutput : boolean = false;

  constructor(
    @Inject(ElementRef) elementRef : ElementRef,
    private renderer : Renderer
  ) {
    this.elementRef = elementRef;
  }

  ngOnInit() {
  }

  updateEquation() {
    if (/\S/.test(this.inputString)) {
      // String is not empty and not just whitespace, nullify the existing
      // variable in case the Expression constructor fails (and clear the TeX
      // strings)
      this.expression = null;
      this.rawTeX = '';
      this.decoratedTeX = '';

      // Attempt to generate an Expression object from the string
      try {
        this.expression = new Expression(this.inputString);
      } catch (e) {}

      if (this.expression != null) {
        // Generate the raw and decorated TeX from the Expression
        this.rawTeX = generateRawTeX(this.expression);
        this.decoratedTeX = generateDecoratedTeX(this.expression);
      }
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

  handleMathReady(mathReady: boolean) {
    if (this.showOutput) {
      this.showOutput = mathReady;
    } else {
      setTimeout(() => { this.showOutput = mathReady; }, 175);
    }
  }

}
