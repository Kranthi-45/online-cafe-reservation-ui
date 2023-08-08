import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteMenuComponent } from './complete-menu.component';

describe('CompleteMenuComponent', () => {
  let component: CompleteMenuComponent;
  let fixture: ComponentFixture<CompleteMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
