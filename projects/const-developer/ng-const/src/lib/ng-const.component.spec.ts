import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgConstComponent } from './ng-const.component';

describe('NgConstComponent', () => {
  let component: NgConstComponent;
  let fixture: ComponentFixture<NgConstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgConstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgConstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
