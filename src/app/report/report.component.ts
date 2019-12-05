import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {defaultFormat as _rollupMoment} from 'moment';
import { DatePipe } from '@angular/common';
import { MatDatepicker } from '@angular/material';
import { ExpenseResult } from '../expense.model';


const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
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
export class ReportComponent implements OnInit {

  public months: any[];
  private month: any;
  private year: string;
  private total: number;

  config: any;
  collection = { count: 5, data: [] };

  date = new FormControl(_moment());

  chosenYearHandler(normalizedYear: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  chosenMonthHandler(normalizedMonth: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  generateReport() {
    this.collection.data = [];
    let mon = this.month + 1;

    if (isNaN(this.month) || this.month === '') {
      mon = 0;
    }

//    alert(isNaN(this.month))

    this.total = 0;
    this.api.reportExpense(mon, this.date.value.year()).subscribe((res: ExpenseResult) => {
      this.config.totalItems = this.collection.count = res.count;
      for (let i = 0; i < this.collection.count; i++) {
        this.collection.data.push(
          {
            id: i + 1,
            value: res.expenses[i]
          }
        );
        this.total += parseInt(res.expenses[i].amount);
      }
    });
  }

  constructor(private api: ApiService, private datePipe: DatePipe) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.count
    };

    //this.month = 5;
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.month = parseInt(_moment().format('M')) - 1;


    this.months = _moment.months();
    this.year = _moment().format('YYYY');
    this.generateReport()
    //console.log(this.month)
  }

}
