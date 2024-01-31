import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecipeComponent } from './list-recipe.component';

describe('ListRecipeComponent', () => {
  let component: ListRecipeComponent;
  let fixture: ComponentFixture<ListRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRecipeComponent]
    });
    fixture = TestBed.createComponent(ListRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
