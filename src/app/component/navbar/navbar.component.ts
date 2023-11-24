import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private router : Router, private http:HttpClient, private logiService: LoginService) {};

  public close(){
    this.logiService.closeSession();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }
}
