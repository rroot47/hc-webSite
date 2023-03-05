import { Component } from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isAuth : boolean | any;
  subscription: Subscription | any;

  constructor(private router:Router) {
    this.subscription = router.events.subscribe((event) =>{
      if(localStorage.getItem("accessToken")!=null){
        if(event instanceof NavigationStart)
          this.isAuth = true
      }else{
        this.isAuth = false;
      }

    })
  }
}
