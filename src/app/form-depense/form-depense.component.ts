import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypedepenseEnum} from "../enums/typedepense.enum";
import {UserModel} from "../models/User.model";
import {DepenseModel} from "../models/depense.model";
import {DepenseService} from "../services/depense.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-depense',
  templateUrl: './form-depense.component.html',
  styleUrls: ['./form-depense.component.css']
})
export class FormDepenseComponent implements OnInit {

  userForm : FormGroup | any;
  val : any

  constructor(private formBuilder: FormBuilder, private depenseService:DepenseService, private router:Router) { }

  ngOnInit(): void {
    this.initFormUser();
  }

  initFormUser(){
    this.userForm = this.formBuilder.group({
      typeDepense:['', Validators.required],
      description:['', Validators.required],
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      date : ['', Validators.required],
      somme : [0, Validators.required]
    });
  }

  addDepense(){
    const typeDepense = this.userForm.get('typeDepense').value;
    const description = this.userForm.get('description').value;
    const nom = this.userForm.get('nom').value;
    const prenom = this.userForm.get('prenom').value;
    const date = this.userForm.get('date').value;
    const somme = this.userForm.get('somme').value;

    const depense = new DepenseModel(typeDepense, description, nom,prenom,date,somme);
    this.depenseService.addDepense(depense).subscribe(data=>{
      console.log(data)
      this.router.navigateByUrl("/admin/depense")
    })
  }

}
