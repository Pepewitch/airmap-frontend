import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatorListComponent } from './animator-list.component';

describe('AnimatorListComponent', () => {
  let component: AnimatorListComponent;
  let fixture: ComponentFixture<AnimatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
