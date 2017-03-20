import { IExpression } from './expression-types'

export class Equation {
  public lexerErrors? : any;
  public parserErrors? : any;
  public expressionTree? : IExpression;

  constructor(lexerErrors? : any, parserErors? : any, expressionTree? : IExpression)
  {
    if(lexerErrors && lexerErrors.length > 0) {
      this.lexerErrors = lexerErrors;
    }
    if(parserErors && parserErors.length > 0) {
      this.parserErrors = parserErors;
    }
    if(!this.lexerErrors && !this.parserErrors) {
      this.expressionTree = expressionTree;
    }
  }

  get RawTeX() : string {
    return this.expressionTree ? this.expressionTree.getRawTeX() : null;
  }

  get VariableList() : string[] {
    return this.expressionTree ? this.expressionTree.getVariableNames() : null;
  }
}
