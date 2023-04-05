import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {UtilisateurModel} from "../models/utilisateur.model";

@Component({
  selector: 'app-verify-acount',
  templateUrl: './verify-acount.component.html',
  styleUrls: ['./verify-acount.component.css']
})
export class VerifyAcountComponent implements OnInit {

  userForm : FormGroup | any;
  utilisateurModel:UtilisateurModel | any;
  errorMessage!:string

  constructor(private route:ActivatedRoute ,
              private formBuilder: FormBuilder,
              private  userService:UserService,
              private router:Router) { }

  ngOnInit(): void {
    this.initFormVerifier();
  }

  initFormVerifier(){
    this.userForm = this.formBuilder.group({
      code : ['', Validators.required],
    });
  }
  check(){
    const code = this.userForm.get('code').value;
    return this.userService.getUserByCode(code).subscribe(data=>{
      this.utilisateurModel = data;
      this.userService.verifyUser(code).subscribe(data=>{
        localStorage.setItem("code", this.utilisateurModel.verificationCode);
        this.router.navigateByUrl("/signin");
      })
    },
      error => {
        this.errorMessage = `Code de verification que vous avez saissie : ${code} est incorrect `;
      })
  }
}
