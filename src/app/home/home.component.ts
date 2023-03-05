import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content:boolean = false;
  constructor(private  router:Router) { }

  ngOnInit(): void {
  }

  signin(){
    this.content=true
    this.router.navigateByUrl('/signin')
  }
  signup(){

  }
}
