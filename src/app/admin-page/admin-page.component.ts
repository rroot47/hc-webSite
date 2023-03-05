import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "../models/User.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  userName!:String |any
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem("user");
  }

  onSignOut() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    localStorage.removeItem("roles")
    localStorage.removeItem("userID")
    localStorage.removeItem("email")
    this.router.navigate(['/home']);
  }

}
