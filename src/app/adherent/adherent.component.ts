import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {UserModel} from "../models/User.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adherent',
  templateUrl: './adherent.component.html',
  styleUrls: ['./adherent.component.css']
})
export class AdherentComponent implements OnInit {

  userForm : FormGroup | any;
  newYears : [] | any

  constructor(private formBuilder: FormBuilder, private  userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.initFormUser();
  }

  initFormUser(){
    this.userForm = this.formBuilder.group({
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      telephone : ['', Validators.required],
      domicile : ['', Validators.required],
      montantAdhesion : ['', Validators.required],
      adherant : this.formBuilder.array([])
    });
  }


  addUser(){
    const nom = this.userForm.get('nom').value;
    const prenom = this.userForm.get('prenom').value;
    const telephone = this.userForm.get('telephone').value;
    const domicile = this.userForm.get('domicile').value;
    const montantAdhesion = this.userForm.get('montantAdhesion').value;
    const adherant = this.userForm.get('adherant').value ? this.userForm.get('adherant').value : [];

    const user = new UserModel(nom,prenom,telephone,domicile,montantAdhesion, adherant);
    this.userService.addAdherent(user).subscribe(data=>{
      this.router.navigate(['/admin/list-membre'])
    });
  }

  get getYears(){
    return this.userForm.controls['adherant'] as FormArray
  }

  addYeats(){
    this.newYears =  this.formBuilder.group({
      annee:['', Validators.required],
      montant :['', Validators.required]
    });
    this.getYears.push(this.newYears);
  }

  resetYears(){
    this.getYears.removeAt(this.newYears)
  }



}
