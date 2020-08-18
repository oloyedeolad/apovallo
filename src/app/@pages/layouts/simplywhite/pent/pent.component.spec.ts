import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PentComponent } from './pent.component';

describe('PentComponent', () => {
  let component: PentComponent;
  let fixture: ComponentFixture<PentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
