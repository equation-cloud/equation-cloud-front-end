import { Directive, ElementRef, Input } from '@angular/core';

declare var MathJax: any;

@Directive({
  selector: '[MathJax]'
})
export class MathJaxDirective {
  @Input('MathJax') equationString: string;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.el.nativeElement.innerHTML = '<script type="math/tex">\\displaystyle{' + this.equationString + '}</script>';
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
  }
}
