import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFlavorComponent } from './update-flavor.component';

describe('UpdateFlavorComponent', () => {
  let component: UpdateFlavorComponent;
  let fixture: ComponentFixture<UpdateFlavorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateFlavorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
