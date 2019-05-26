import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeightSelectorComponent } from './height-selector.component';

describe('HeightSelectorComponent', () => {
  let component: HeightSelectorComponent;
  let fixture: ComponentFixture<HeightSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeightSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeightSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
