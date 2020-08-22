import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnxSuccessfulComponent } from './tnx-successful.component';

describe('TnxSuccessfulComponent', () => {
  let component: TnxSuccessfulComponent;
  let fixture: ComponentFixture<TnxSuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnxSuccessfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnxSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
