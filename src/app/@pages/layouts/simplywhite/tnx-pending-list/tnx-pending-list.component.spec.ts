import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnxPendingListComponent } from './tnx-pending-list.component';

describe('TnxPendingListComponent', () => {
  let component: TnxPendingListComponent;
  let fixture: ComponentFixture<TnxPendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnxPendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnxPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
