import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplywhiteComponent } from './simplywhite.component';

describe('SimplywhiteComponent', () => {
  let component: SimplywhiteComponent;
  let fixture: ComponentFixture<SimplywhiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplywhiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplywhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
