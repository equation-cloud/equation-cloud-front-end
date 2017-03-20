import { TestBed, inject } from '@angular/core/testing';

import { EquationService } from './equation';

describe('Equation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Equation]
    });
  });

  it('should ...', inject([Equation], (service: Equation) => {
    expect(service).toBeTruthy();
  }));
});
