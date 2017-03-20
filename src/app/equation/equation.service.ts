import { Injectable } from '@angular/core';
import { ParserService } from './parser.service';
import { Equation } from './equation';

@Injectable()
export class EquationService {
  private parser : ParserService;

  constructor(parser : ParserService)
  {
    this.parser = parser;
  }

  createEquationFromString = function(inputString : string) : Equation
  {
    var parserResult = this.parser.parseString(inputString);
    return new Equation(parserResult.lexerErrors, parserResult.parserErrors, parserResult.expressionTree)
  }
}
