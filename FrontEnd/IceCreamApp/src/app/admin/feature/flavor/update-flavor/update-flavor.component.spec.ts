import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFlavorComponent } from './update-flavor.component';

describe('UpdateFlavorComponent', () => {
  let component: UpdateFlavorComponent;
  let fixture: ComponentFixture<UpdateFlavorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFlavorComponent]
    });
    fixture = TestBed.createComponent(UpdateFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
