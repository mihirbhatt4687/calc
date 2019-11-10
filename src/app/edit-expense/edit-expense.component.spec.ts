import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpenseComponent } from './edit-expense.component';

describe('EditExpenseComponent', () => {
  let component: EditExpenseComponent;
  let fixture: ComponentFixture<EditExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
