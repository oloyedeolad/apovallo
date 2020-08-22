import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnxPendingComponent } from './tnx-pending.component';

describe('TnxPendingComponent', () => {
  let component: TnxPendingComponent;
  let fixture: ComponentFixture<TnxPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnxPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnxPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
