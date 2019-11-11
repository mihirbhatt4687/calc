import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private email: string;
  private password: string;


  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
   // console.log(app)
  }

  doLogin() {
    //console.log(this.validateEmail(this.email));

    this.api.doLogin(this.email, this.password).subscribe((res: User) => {
      if (res.login !== '') {
        localStorage.setItem('user', res.login);
        //this.router.navigate(['expense']);
        window.location.href = document.getElementsByTagName('base')[0].href;
      } else {
        alert('Invalid login credentials')
      }
    });
  }



  validateEmail(emailField: string){
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) == false)
    {
        return false;
    }
    return true;
}
}
