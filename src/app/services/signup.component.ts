import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {SignupModels} from "../models/signup.models";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm : FormGroup | any;
  //signUpModel:SignupModels[]|any

  constructor(private formBuilder:FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(){
    this.signUpForm = this.formBuilder.group({
      nom : ['', [Validators.required]],
      prenom : ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required,  Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      confirmPassword : ['', [Validators.required,  Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(){
    const nom = this.signUpForm.get('nom').value;
    const prenom = this.signUpForm.get('prenom').value;
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const confirmPassword = this.signUpForm.get('confirmPassword').value;

    this.userService.addUser(nom,prenom,email,password,confirmPassword).subscribe((data)=>{
      this.router.navigate(['/signin'])
    });
  }
}
