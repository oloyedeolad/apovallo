import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnxApprovedListComponent } from './tnx-approved-list.component';

describe('TnxApprovedListComponent', () => {
  let component: TnxApprovedListComponent;
  let fixture: ComponentFixture<TnxApprovedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TnxApprovedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnxApprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
