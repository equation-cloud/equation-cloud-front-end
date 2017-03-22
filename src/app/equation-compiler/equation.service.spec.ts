import { TestBed, inject } from '@angular/core/testing';

import { EquationService } from './equation.service';

describe('EquationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquationService]
    });
  });

  it('should ...', inject([EquationService], (service: EquationService) => {
    expect(service).toBeTruthy();
  }));
});
