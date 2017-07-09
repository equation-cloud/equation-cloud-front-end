import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

declare var MathJax: any;

@Directive({
  selector: '[MathJax]'
})
export class MathJaxDirective {
  @Input('MathJax') equationString: string;

  @Output() mathReady = new EventEmitter<boolean>();

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.mathReady.emit(false);
    this.el.nativeElement.innerHTML = '<script type="math/tex">\\displaystyle{' + this.equationString + '}</script>';
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
    MathJax.Hub.Queue(this.mathReady.emit(true));
  }

}
