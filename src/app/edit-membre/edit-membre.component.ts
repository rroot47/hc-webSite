import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../models/User.model";
import {ActivatedRoute, Router} from "@angular/router";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-membre',
  templateUrl: './edit-membre.component.html',
  styleUrls: ['./edit-membre.component.css']
})
export class EditMembreComponent implements OnInit {

  userForm : FormGroup | any;
  newYears : [] | any

  membreId!:number;

  membre:UserModel[]|any = [];

  constructor(private route:ActivatedRoute ,
              private formBuilder: FormBuilder,
              private  userService:UserService,
              private router:Router) {
    this.membreId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.userService.getMembre(this.membreId).subscribe((data:UserModel)=>{
      this.membre =data;
      this.initFormUser()
    })
  }

  initFormUser(){
    this.userForm = this.formBuilder.group({
      nom : [this.membre.nom, Validators.required],
      prenom : [this.membre.prenom, Validators.required],
      telephone : [this.membre.telephone, Validators.required],
      domicile : [this.membre.domicile, Validators.required],
      montantAdhesion : [this.membre.montantAdhesion, Validators.required],
      adherant : this.formBuilder.array([])
    });
  }

  updateUser(){
    const nom = this.userForm.get('nom').value;
    const prenom = this.userForm.get('prenom').value;
    const telephone = this.userForm.get('telephone').value;
    const domicile = this.userForm.get('domicile').value;
    const montantAdhesion = this.userForm.get('montantAdhesion').value;
    const adherant = this.userForm.get('adherant').value ? this.userForm.get('adherant').value : [];

    const user = new UserModel(nom,prenom,telephone,domicile,montantAdhesion, adherant);
    this.userService.updateAdherant(this.membreId,user).subscribe((data:any)=>{
      this.router.navigate(['/admin/dette'])
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
