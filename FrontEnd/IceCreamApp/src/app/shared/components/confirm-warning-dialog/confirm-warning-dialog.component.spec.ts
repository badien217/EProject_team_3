import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWarningDialogComponent } from './confirm-warning-dialog.component';

describe('ConfirmWarningDialogComponent', () => {
  let component: ConfirmWarningDialogComponent;
  let fixture: ComponentFixture<ConfirmWarningDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmWarningDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
