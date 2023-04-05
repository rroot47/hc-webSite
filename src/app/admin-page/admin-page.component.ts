import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BnNgIdleService} from "bn-ng-idle";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  userName!:String |any;

  constructor(private router:Router, private bnNgIdleService:BnNgIdleService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem("user");
    this.bnNgIdleService!.startWatching(300).subscribe((isTimeOut:boolean)=>{
      if(isTimeOut){
        this.onSignOut();
        this.bnNgIdleService.stopTimer();
      }
    })
  }

  onSignOut() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    localStorage.removeItem("roles")
    localStorage.removeItem("userID")
    localStorage.removeItem("email")
    localStorage.removeItem("code")
    this.router.navigate(['/home']);
  }

}
