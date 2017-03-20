import { IExpression } from './expression-types'

export class Equation {
  public lexerErrors? : any;
  public parserErrors? : any;
  public expressionTree? : IExpression;
  public rawTeX? : string;

  constructor(lexerErrors? : any, parserErors? : any, expressionTree? : IExpression)
  {
    if(lexerErrors && lexerErrors.length > 0) {
      this.lexerErrors = lexerErrors;
    }
    if(parserErors && parserErors.length > 0) {
      this.parserErrors = parserErors;
    }
    this.expressionTree = expressionTree;
    if(expressionTree){
      this.rawTeX = this.getRawTeX();
    }
  }

  public getRawTeX() : string
  {
    return this.expressionTree ? this.expressionTree.getRawTeX() : "";
  }
}
