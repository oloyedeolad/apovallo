import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnxFailedComponent } from './tnx-failed.component';

describe('TnxFailedComponent', () => {
  let component: TnxFailedComponent;
  let fixture: ComponentFixture<TnxFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnxFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnxFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
