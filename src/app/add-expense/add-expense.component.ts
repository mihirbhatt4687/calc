import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ApiService } from '../api.service';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment} from 'moment';
import { DatePipe } from '@angular/common';

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
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
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
export class AddExpenseComponent implements OnInit {

  @ViewChild('myInput', {static: false}) myInputVariable: ElementRef;

  private title: string;

  private amount: string;
  private doc: string;
  fileToUpload: File = null;
  allowedFileTypes: any = [
    'image/jpeg',
    'image/png',
    'image/gif'
  ];

  //private edate: any = new Date();;
  private error = [];

  edate = new FormControl(_moment());

  constructor(private api: ApiService, private datePipe: DatePipe) {
    //this.edate = this.datePipe.transform(this.edate, 'dd.mm.yyyy');
    //conso
  }

  ngOnInit() {
  }

  addExpense() {
    if (typeof this.title === 'undefined' || typeof this.amount === 'undefined' || typeof this.edate === 'undefined') {
      this.error.push('Please fill mendatory fields');
    } else if (this.fileToUpload && this.allowedFileTypes.indexOf(this.fileToUpload.type) === -1) {
      this.error.push('File must be jpeg, png or gif');
    } else {
      const tmpDate = this.edate.value.toDate();
      const dd = String(tmpDate.getDate()).padStart(2, '0');
      const mm = String(tmpDate.getMonth() + 1).padStart(2, '0');
      const yyyy = tmpDate.getFullYear();
      const today = dd + '.' + mm + '.' + yyyy;

      this.api.addExpense(this.title, this.amount, today, this.fileToUpload).subscribe((res) => {
        alert('Expense is added!');
        this.title = this.amount = '';
        this.myInputVariable.nativeElement.value = '';
      });
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
