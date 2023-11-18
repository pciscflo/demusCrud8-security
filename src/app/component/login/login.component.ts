import { Router } from '@angular/router';
import { Credentials } from './../../model/credentials';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Author } from 'src/app/model/authors';
import { AuthorService } from 'src/app/service/author.service';
import { LoginService } from 'src/app/service/login.service';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  creds: Credentials= {
     username: "",
     password: ""
  }
  constructor(private loginService: LoginService,
              private router: Router){};

  getAuthors(form: NgForm){
    console.log('Form Value:',form.value);
    return this.loginService.login(this.creds)
                            .subscribe(response => {
                            this.router.navigate(['/authors']);
                            })
  }

  login(form: NgForm){
    console.log('form value', form.value);
     this.loginService.login(this.creds)
      .subscribe(response => {
        this.router.navigate(['/authors']);
      });
  }

}

