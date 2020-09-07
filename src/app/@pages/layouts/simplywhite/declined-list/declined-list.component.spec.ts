import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedListComponent } from './declined-list.component';

describe('DeclinedListComponent', () => {
  let component: DeclinedListComponent;
  let fixture: ComponentFixture<DeclinedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclinedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
