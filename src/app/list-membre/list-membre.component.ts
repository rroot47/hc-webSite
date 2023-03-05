import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {UserModel} from "../models/User.model";

@Component({
  selector: 'app-list-membre',
  templateUrl: './list-membre.component.html',
  styleUrls: ['./list-membre.component.css']
})
export class ListMembreComponent implements OnInit {

  userModel:UserModel[]|any = [];
  constructor(private router:Router, private userService : UserService) { }

  ngOnInit(): void {
    this.getAllMembres();
  }

  getAllMembres(){
    return this.userService.getAllMembres().subscribe(data=>{
      this.userModel = data;
    })
  }

}
