import { Injectable } from '@angular/core';
import { Token, ISimpleTokenOrIToken, Lexer, Parser, getImage } from 'chevrotain';
import {
  IExpression,
  IntegerExpression,
  DecimalExpression,
  VariableExpression,
  MinusOneExpression,
  EqualsExpression,
  SubtractionExpression,
  AdditionExpression,
  MultiplicationExpression,
  DivisionExpression,
  PowerExpression
} from './expression-types';

@Injectable()
export class ParserService {
  public lexer: Lexer;
  public parser: Parser;
  static AllTokens: any;

  constructor() {
    ParserService.AllTokens = [Whitespace, Integer, Dot, Variable, LeftBracket, RightBracket, Equals, Plus, Minus, Times, Divide, Power];
    this.lexer = new Lexer(ParserService.AllTokens);
    this.parser = new EquationParser([]);
   }

  parseString (input : string) {
    let lexerResult = this.lexer.tokenize(input);
    this.parser.input = lexerResult.tokens;
    let expressionTree : IExpression = (this.parser as EquationParser).selectExpression();
    return {
      lexerErrors : lexerResult.errors,
      parserErrors : this.parser.errors,
      expressionTree : expressionTree
    }
  }
}

interface EquationParser {
  selectInteger: () => IExpression;
  selectDecimal: () => IExpression;
  selectVariable: () => IExpression;
  selectAtomic: () => IExpression;
  selectPower: () => IExpression;
  selectDivision: () => IExpression;
  selectMultiplication: () => IExpression;
  selectAddition: () => IExpression;
  selectSubtraction: () => IExpression;
  selectEquals: () => IExpression;
  selectExpression: () => IExpression;
}

class EquationParser extends Parser {
  constructor(input: ISimpleTokenOrIToken[]) {
    super(input, ParserService.AllTokens);

    this.RULE<IExpression>("selectExpression", () => {
      return this.SUBRULE<IExpression>(this.selectEquals);
    });

    this.RULE<IExpression>("selectEquals", () => {
      var operands = [this.SUBRULE<IExpression>(this.selectSubtraction)];
      this.OPTION(() => {
        this.CONSUME(Equals);
        operands.push(this.SUBRULE2<IExpression>(this.selectSubtraction));
      });
      if(operands.length == 1){
        return operands[0];
      } else {
        let expression = new EqualsExpression(operands);
        for (let operand of operands){
          operand.parent = expression;
        }
        return expression;
      }
    });

    this.RULE<IExpression>("selectSubtraction", () => {
      var operands = [this.SUBRULE<IExpression>(this.selectAddition)];
      this.MANY(() => {
        this.CONSUME(Minus);
        operands.push(this.SUBRULE2<IExpression>(this.selectAddition));
      });
      if(operands.length == 1){
        return operands[0];
      } else {
        let expression = new SubtractionExpression(operands);
        for (let operand of operands){
          operand.parent = expression;
        }
        return expression;
      }
    });

    this.RULE<IExpression>("selectAddition", () => {
      var operands = [this.SUBRULE<IExpression>(this.selectMultiplication)];
      this.MANY(() => {
        this.CONSUME(Plus);
        operands.push(this.SUBRULE2<IExpression>(this.selectMultiplication));
      });
      if(operands.length == 1){
        return operands[0];
      } else {
        let expression = new AdditionExpression(operands);
        for (let operand of operands){
          operand.parent = expression;
        }
        return expression;
      }
    });

    this.RULE<IExpression>("selectMultiplication", () => {
      var operands = [this.SUBRULE<IExpression>(this.selectDivision)];
      this.MANY(() => {
        this.CONSUME(Times);
        operands.push(this.SUBRULE2<IExpression>(this.selectDivision));
      });
      if(operands.length == 1){
        return operands[0];
      } else {
        let expression = new MultiplicationExpression(operands);
        for (let operand of operands){
          operand.parent = expression;
        }
        return expression;
      }
   });

   this.RULE<IExpression>("selectDivision", () => {
      var operands = [this.SUBRULE<IExpression>(this.selectPower)];
      this.OPTION(() => {
        this.CONSUME(Divide);
        operands.push(this.SUBRULE2<IExpression>(this.selectPower));
      });
      if(operands.length == 1){
        return operands[0];
      } else {
        let expression = new DivisionExpression(operands);
        for(let operand of operands){
          operand.parent = expression;
        }
        return expression;
      }
   });

   this.RULE<IExpression>("selectPower", () => {
     var operands = [this.SUBRULE<IExpression>(this.selectAtomic)];
     this.OPTION(() => {
       this.CONSUME(Power);
       operands.push(this.SUBRULE2<IExpression>(this.selectAtomic));
     });
     if(operands.length == 1){
       return operands[0];
     } else {
       let expression = new PowerExpression(operands);
       for(let operand of operands){
         operand.parent = expression;
       }
       return expression;
     }
   });

    this.RULE<IExpression>("selectAtomic", () => {
      return this.OR<IExpression>([
        {ALT: () => { return this.SUBRULE<IExpression>(this.selectDecimal)}},
        {ALT: () => { return this.SUBRULE2<IExpression>(this.selectInteger)}},
        {ALT: () => {
          this.CONSUME(LeftBracket);
          var expression = this.SUBRULE<IExpression>(this.selectExpression);
          this.CONSUME(RightBracket);
          return expression;
        }},
        {ALT: () => { return this.SUBRULE3<IExpression>(this.selectVariable)}},
        {ALT: () => {
          this.CONSUME(Minus);
          var expression = this.SUBRULE4<IExpression>(this.selectAtomic);
          return new MultiplicationExpression([
            new MinusOneExpression(),
            expression
          ]);
        }}
      ]);
    });

    this.RULE<VariableExpression>("selectVariable", () => {
      return new VariableExpression(getImage(this.CONSUME(Variable)));
    });

    this.RULE<IntegerExpression>("selectInteger", () => {
      return new IntegerExpression(getImage(this.CONSUME(Integer)));
    });

    this.RULE<DecimalExpression>("selectDecimal", () => {
      var integer : string = "0";
      this.OPTION(() => { integer = this.SUBRULE<IExpression>(this.selectInteger)['value']});
      this.CONSUME(Dot);
      var fractional = this.SUBRULE2<IExpression>(this.selectInteger)['value'];
      return new DecimalExpression(integer, fractional);
    });

    Parser.performSelfAnalysis(this);
  }
}

//The chevrotain token classes for the lexer
class Whitespace extends Token {
  static PATTERN = /\s+/;
  static GROUP = Lexer.SKIPPED; 
}

class Integer extends Token {
  static PATTERN = /\d+/;
}

class Dot extends Token {
  static PATTERN = /\./;
}

class Variable extends Token {
  static PATTERN = /[A-Za-z]+/;
}

class Equals extends Token {
  static PATTERN = /=/;
}

class Plus extends Token {
  static PATTERN = /\+/;
}

class Minus extends Token {
  static PATTERN = /-/;
}

class Times extends Token {
  static PATTERN = /\*/;
}

class Divide extends Token {
  static PATTERN = /\//;
}

class Power extends Token {
  static PATTERN = /\^/;
}

class LeftBracket extends Token {
  static PATTERN = /\(/;
}

class RightBracket extends Token {
  static PATTERN = /\)/;
}
