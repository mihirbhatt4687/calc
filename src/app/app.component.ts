import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { User } from './user.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calc';
  public test = 'test';
  count = 4;
  rowHtml = `<div class="col col-xs-6">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Expense Reason" />
                </div>
              </div>
              <div class="col col-xs-6">
                  <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="Amount" />
                  </div>
                </div>`;

  private islogin = false;

  private baseUrl = 'http://www.gjbazaar.com/web/';

  private loginUser: number;

  constructor(private api: ApiService, private httpClient: HttpClient, private router: Router) {
  }

  setlogin() {
    if (localStorage.getItem('user')) {
      this.islogin = true;
    }
    return this.islogin;
  }

  doLogout() {
    if (this.setlogin()) {
      this.islogin = false;
      localStorage.removeItem('user');
      //this.router.navigate(['']);
      window.location.href = document.getElementsByTagName('base')[0].href;
    }
  }
}
