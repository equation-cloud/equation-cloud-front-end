import { IExpression, OperatorExpression } from './expression-types'

export class Equation {
  public lexerErrors? : any;
  public parserErrors? : any;
  public expressionTree? : IExpression;
  private rawTeX? : string;
  private decoratedTeX? : string;
  private variables : any[] = [];

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
      this.generateItemLists(this.expressionTree);
      this.rawTeX = this.expressionTree.getTeX(false);
      this.decoratedTeX = this.expressionTree.getTeX(true);
      console.log(this.decoratedTeX);
    }
  }

  //Read only properties

  get RawTeX() : string {
    return this.rawTeX ? this.rawTeX : null;
  }

  get DecoratedTeX() : string {
    return this.decoratedTeX ? this.decoratedTeX : null;
  }

  get Variables() : string[] {
    return this.variables;
  }

  //methods

  private generateItemLists(expression: IExpression) : void {
    //recursivley traverse through the tree and add variables to a list
    if(expression instanceof OperatorExpression) {
      for(let operand of expression.operands) {
        this.generateItemLists(operand);
      }
    } else {
      switch(expression.type){
        case "variable":
          let item = this.variables.find((value, index, obj) => {
            return value.name == expression.value;
          });
          if(item) {
            let id = expression.value + "_" + item.ids.length;
            item.ids.push(id);
          } else {
            let id = expression.value + "_0";
            expression['id'] = id;
            this.variables.push({
              name: expression.value,
              ids : [id]
            })
          }
          break;
        case "integer":
        case "decimal":
          break;
        default:
          console.error("Unrecognized expression type: " + expression.type);
          return;
      }
    }
  }
}
