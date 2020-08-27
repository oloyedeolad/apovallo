import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HommComponent } from './homm.component';

describe('Index1Component', () => {
  let component: HommComponent;
  let fixture: ComponentFixture<HommComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HommComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
