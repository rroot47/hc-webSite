import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {UserModel} from "../models/User.model";
import {Membre} from "../models/membre.model";

@Component({
  selector: 'app-list-membre',
  templateUrl: './list-membre.component.html',
  styleUrls: ['./list-membre.component.css']
})
export class ListMembreComponent implements OnInit {

  userModel:UserModel[]|any = [];
  membre!:Membre [] |any ;
  userMembre!:UserModel[]|any
  totalPages!:number;
  page:number=0;
  size:number=5;
  constructor(private router:Router, private userService : UserService) { }

  ngOnInit(): void {
    this.getAllMembres();
    this. getAllMembresPage();
  }

  getAllMembres(){
    return this.userService.getAllMembres().subscribe(data=>{
      this.userModel = data;
    })
  }

  getAllMembresPage(){
    return this.userService.getAllMembresPage(this.page, this.size).subscribe(data=>{
      this.membre = data;
      this.userMembre = this.membre.allMemberDTOS;
      this.totalPages = this.membre.totalPages;
    });
  }

  gotoPage(p: number) {
    this.page = p;
    this.getAllMembresPage();
  }

  gotoPagePrecedent(){
    this.page = this.page -1;
    this.getAllMembresPage();
  }

  gotoPageSuivant(){
    this.page = this.page +1;
    this.getAllMembresPage();
  }

  onViewMember(id:number){
    this.router.navigate(['/admin/single-membre', id]);
  }
}
