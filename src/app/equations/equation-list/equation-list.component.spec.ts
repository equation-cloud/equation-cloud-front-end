import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationListComponent } from './equation-list.component';

describe('EquationListComponent', () => {
  let component: EquationListComponent;
  let fixture: ComponentFixture<EquationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
