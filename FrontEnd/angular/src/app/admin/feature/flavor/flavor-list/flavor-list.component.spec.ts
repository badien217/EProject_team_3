import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorListComponent } from './flavor-list.component';

describe('FlavorListComponent', () => {
  let component: FlavorListComponent;
  let fixture: ComponentFixture<FlavorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlavorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlavorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
