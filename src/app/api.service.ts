import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { Expense, ExpenseResult } from './expense.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://gjbazaar.com/web/login.php';
  private isapiUrl = 'http://gjbazaar.com/web/islogin.php';
  private addExpenseUrl = 'http://gjbazaar.com/web/addExpenseWeb.php';
  private loadExpenseUrl = 'http://gjbazaar.com/web/loadExpenseWeb.php';
  private deleteExpenseUrl = 'http://gjbazaar.com/web/deleteExpenseWeb.php';
  private updateExpenseUrl = 'http://gjbazaar.com/web/updateExpenseWeb.php';
  private editExpenseUrl = 'http://gjbazaar.com/web/editExpenseWeb.php';
  private reportExpenseUrl = 'http://gjbazaar.com/web/reportExpenseWeb.php';

  private body = new HttpParams();
  private loginUser: string;

  constructor(private http: HttpClient) {
    this.isLogin(localStorage.getItem('user')).subscribe((res: User) => {
      this.loginUser = res.user;
    });

  }


  doLogin(username: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', password);
    const options = {
      headers,
      params,
      withCredentials: true
    };
    return this.http.post<User>(this.apiUrl, params);
  }

  isLogin(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('token', token);
    const options = {
      headers,
      params,
      withCredentials: true
    };
    return this.http.post(this.isapiUrl, params);
  }

  checkLogin() {
    this.isLogin(localStorage.getItem('user')).subscribe((res: User) => {
      this.loginUser = res.user;
    });
    return this.loginUser;
  }

  addExpense(title: string, amount: string, edate: string, fileToUpload: File) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('user', this.loginUser);

    const formData: FormData = new FormData();

    if (fileToUpload) {
      formData.append('files', fileToUpload, fileToUpload.name);
    }
    formData.append('token', localStorage.getItem('user'));
    formData.append('title', title);
    formData.append('amount', amount);
    formData.append('date', edate);

    return this.http.post(this.addExpenseUrl, formData);
  }

  editExpense(id: string): Observable<Expense> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('token',  localStorage.getItem('user'))
      .set('id', id);
    return this.http.post<Expense>(this.editExpenseUrl, params);
  }

  updateExpense(id: string, title: string, amount: string, edate: string, fileToUpload: File): Observable<Expense> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('user', this.loginUser);

    const formData: FormData = new FormData();

    formData.append('id', id);
    if (fileToUpload) {
      formData.append('files', fileToUpload, fileToUpload.name);
    }
    formData.append('token', localStorage.getItem('user'));
    formData.append('title', title);
    formData.append('amount', amount);
    formData.append('date', edate);

    // const options = {
    //   headers,
    //   params,
    //   withCredentials: true
    // };
    // console.log(params);
    return this.http.post<Expense>(this.updateExpenseUrl, formData);
  }

  loadExpense(searchText: string, startDate: string, endDate: string): Observable<ExpenseResult> {
    const params = new HttpParams()
      .set('token', localStorage.getItem('user'))
      .set('searchText', searchText)
      .set('sDate', startDate)
      .set('eDate', endDate);

    return this.http.post<ExpenseResult>(this.loadExpenseUrl, params);
  }

  reportExpense(month: string, year: string): Observable<ExpenseResult> {
    const params = new HttpParams()
      .set('token', localStorage.getItem('user'))
      .set('month', month)
      .set('year', year);

    return this.http.post<ExpenseResult>(this.reportExpenseUrl, params);
  }

  deleteExpense(expense: Expense) {
    const params = new HttpParams()
      .set('token', localStorage.getItem('user'))
      .set('uid', '' + expense.id);
    return this.http.post(this.deleteExpenseUrl, params);
  }
}
