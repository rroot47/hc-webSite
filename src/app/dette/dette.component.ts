import { Component, OnInit } from '@angular/core';
import {UserModel} from "../models/User.model";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dette',
  templateUrl: './dette.component.html',
  styleUrls: ['./dette.component.css']
})
export class DetteComponent implements OnInit {

  userModel:UserModel[]|any = [];
  val : any

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getAllMembres();
    this.val = 2023;
  }

  clickSelected(e:any){
    this.val=e.target.value;
  }

  getAllMembres(){
    return this.userService.getAllMembres().subscribe((data:UserModel)=>{
      this.userModel = data;
    })
  }
  onViewMember(id:number){
    this.router.navigate(['/admin/edit-membre', id]);
  }

  getMembre(id:number){
    this.userService.getMembre(id).subscribe((data)=>{
      console.log(data)
    })
  }

}
