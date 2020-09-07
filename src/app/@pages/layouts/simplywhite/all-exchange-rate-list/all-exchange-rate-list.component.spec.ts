import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExchangeRateListComponent } from './all-exchange-rate-list.component';

describe('AllExchangeRateListComponent', () => {
  let component: AllExchangeRateListComponent;
  let fixture: ComponentFixture<AllExchangeRateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllExchangeRateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExchangeRateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
