import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Expense, ExpenseResult } from '../expense.model';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment} from 'moment';
import { DatePipe } from '@angular/common';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ExpenseComponent implements OnInit {

  animal: string;
  name: string;

  @ViewChild('sdate', { static: true }) sdate: ElementRef;
  @ViewChild('edate', { static: true }) edate: ElementRef;
  @ViewChild('startDate', { static: true }) startDate: ElementRef;

  private expenses: ExpenseResult;

  config: any;
  collection = { count: 5, data: [] };

  constructor(private api: ApiService, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  openDialog(expenseObj: Expense): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: 'auto',
      data: {expense: expenseObj}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  ngOnInit() {
    this.loadExpense();
  }

  clearFilters() {
    this.startDate.nativeElement.value = this.edate.nativeElement.value = this.sdate.nativeElement.value = '';
    this.loadExpense();
  }

  loadExpense() {
    const searchText = this.startDate.nativeElement.value;
    const startDate = this.sdate.nativeElement.value;
    const endDate = this.edate.nativeElement.value;

    this.collection.data = [];
    this.api.loadExpense(searchText, startDate, endDate).subscribe((res: ExpenseResult) => {
      this.config.totalItems = this.collection.count = res.count;
      for (let i = 0; i < this.collection.count; i++) {
        this.collection.data.push(
          {
            id: i + 1,
            value: res.expenses[i]
          }
        );
      }
    });
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  deleteExpense(expense: Expense) {
    const confirmDelete = confirm('Do you want to delete this record?');
    if (confirmDelete) {
      const index = this.collection.data.indexOf(expense, 0);
      if (index > -1) {
        this.collection.data.splice(index, 1);
        this.collection.count = this.collection.count - 1;
        this.config.totalItems = this.collection.count;
      }
      this.api.deleteExpense(expense).subscribe(res => {

      });
    }
  }
}
