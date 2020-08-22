import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnxDetalsComponent } from './tnx-detals.component';

describe('TnxDetalsComponent', () => {
  let component: TnxDetalsComponent;
  let fixture: ComponentFixture<TnxDetalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnxDetalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnxDetalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
