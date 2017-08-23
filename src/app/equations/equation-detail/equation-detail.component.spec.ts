import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationDetailComponent } from './equation-detail.component';

describe('EquationDetailComponent', () => {
  let component: EquationDetailComponent;
  let fixture: ComponentFixture<EquationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
