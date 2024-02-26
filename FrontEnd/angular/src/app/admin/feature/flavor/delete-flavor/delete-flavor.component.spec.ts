import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFlavorComponent } from './delete-flavor.component';

describe('DeleteFlavorComponent', () => {
  let component: DeleteFlavorComponent;
  let fixture: ComponentFixture<DeleteFlavorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteFlavorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
