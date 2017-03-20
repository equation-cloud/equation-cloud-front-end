export interface IExpression {
  type: string;
  parent?: IExpression;
  value?: string;
  integerPart?: string;
  fractionalPart?: string;
  operands?: IExpression[];

  getRawTeX() : string;
}

//Value types from here

export abstract class ValueExpression implements IExpression {
  public type: string;
  public parent?: IExpression;
  public value: string;

  constructor (type: string, value: string, parent?: IExpression)
  {
    this.type = type;
    this.parent = parent;
    this.value = value;
  }

  public getRawTeX() : string {
    return this.value;
  }
}

export class IntegerExpression extends ValueExpression {
  constructor(value : string)
  {
    super("integer", value);
  }
}

export class DecimalExpression extends ValueExpression {
  public integerPart : string;
  public fractionalPart : string;

  constructor (
    integerPart : string,
    fractionalPart : string
  ) 
  {
    super("decimal", integerPart + "." + fractionalPart);
    this.integerPart = integerPart;
    this.fractionalPart = fractionalPart;
  }
}

export class MinusOneExpression implements IExpression {
  public type : string;

  constructor()
  {
    this.type = "minusOne";
  }

  public getRawTeX() : string {
    return "";
  }
}

export class VariableExpression extends ValueExpression {
  constructor(value : string)
  {
    super("variable", value);
  }
}

//Operator types from here

export class OperatorExpression implements IExpression {
  public type: string;
  public parent?: IExpression;
  public operands: IExpression[];
  private texSymbols: string[];
  private static precedence: any = {
    "equals" : 0,
    "subtraction" : 1,
    "addition" : 1,
    "multiplication" : 2,
    "division" : 2,
  }

  constructor (type: string, operands: IExpression[], texSymbols: string[], parent?: IExpression)
  {
    this.type = type;
    this.parent = parent;
    this.operands = operands;
    this.texSymbols = texSymbols;
  }

  public getRawTeX() : string {
    var requiresBrackets = false;
    if(this.parent && 
      this.parent instanceof OperatorExpression &&
      (<OperatorExpression>(this.parent)).getPrecedence() > this.getPrecedence()){
      requiresBrackets = true;
    }
    var outputString : string = "";
    var firstOperand : boolean = true;
    for(let operand of this.operands) {
      if(firstOperand) {
        //Special case for products where the first operand in type minusOne
        if(operand.type === "minusOne") {
          outputString = outputString + "-";
          if(!this.operands[1].value) {
            requiresBrackets = true;
          }
          continue;
        }
        if(requiresBrackets) {
          outputString = outputString + "\\left(";
        }
        outputString = outputString + this.texSymbols[0];
        firstOperand = false;
      }else{
        //Do this for every operand
        outputString = outputString + this.texSymbols[1];
      }
      outputString = outputString + operand.getRawTeX();
    }
    //Now close the TeX output down
    outputString = outputString + this.texSymbols[2];
    if(requiresBrackets) {
      outputString = outputString + "\\right)";
    }
    return outputString;
  }

  private getPrecedence() : number {
    return OperatorExpression.precedence[this.type];
  }
}

export class EqualsExpression extends OperatorExpression {
  constructor(operands : IExpression[])
  {
    super("equals", operands, ["","=", ""], null);
  }
}

export class SubtractionExpression extends OperatorExpression {
  constructor(operands : IExpression[], parent? : IExpression)
  {
    super("subtraction", operands, ["", "-", ""], parent);
  }
}

export class AdditionExpression extends OperatorExpression {
  constructor(operands : IExpression[], parent? : IExpression)
  {
    super("addition", operands, ["", "+", ""], parent);
  }
}

export class MultiplicationExpression extends OperatorExpression {
  constructor(operands : IExpression[], parent? : IExpression)
  {
    super("multiplication", operands, ["", "\\times ", ""], parent);
  }
}

export class DivisionExpression extends OperatorExpression {
  constructor(operands : IExpression[], parent? : IExpression)
  {
    super("division", operands, ["\\frac{", "}{", "}"], parent);
  }
}