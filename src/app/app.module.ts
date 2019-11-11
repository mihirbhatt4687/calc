import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule, MatFormFieldModule, MatButtonModule,} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent, DialogOverviewExampleDialogComponent } from './expense/expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { MatSliderModule } from '@angular/material/slider';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';



const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },

  { path: 'about-us', component: AboutUsComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },

];


if (localStorage.getItem('user')) {
  appRoutes.push(
    { path: 'expense', component: ExpenseComponent },
    { path: 'add-expense', component: AddExpenseComponent },
    { path: 'edit-expense/:id', component: EditExpenseComponent }
  );
}

appRoutes.push(
  { path: '**', redirectTo: '/', pathMatch: 'full' },
);

@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    HomeComponent,
    ExpenseComponent,
    RegisterComponent,
    AddExpenseComponent,
    DialogOverviewExampleDialogComponent,
    EditExpenseComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule, MatInputModule,MatNativeDateModule,MatFormFieldModule, MatDialogModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatSliderModule, MatButtonModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialogComponent],
})
export class AppModule { }
