import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSnackbarComponent } from './info-snackbar.component';

describe('InfoSnackbarComponent', () => {
  let component: InfoSnackbarComponent;
  let fixture: ComponentFixture<InfoSnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoSnackbarComponent]
    });
    fixture = TestBed.createComponent(InfoSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
