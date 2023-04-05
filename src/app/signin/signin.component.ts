import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {UtilisateurModel} from "../models/utilisateur.model";
import {data} from "autoprefixer";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm : FormGroup | any;
  errorMessage: string | any;
  isAuth!:string;
  roles!: [];
  utilisateurModel:UtilisateurModel | any;

  constructor(
    private formBuilder:FormBuilder,
    private  authService:AuthService,
    private userService:UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
//this.formBuilder.control(null, [Validators.required])
  initForm(){
    this.signInForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]]// Validators.pattern(/[0-9a-zA-Z]{6,}/)
    });
  }

  signIn(){
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.userService.getUserByEmail(email).subscribe(userData=>{
      this.utilisateurModel= userData;
      if (this.utilisateurModel.enabled){
        this.authService.signInUser(email, password).subscribe(
          (data:any)=>{
            if(data.token!=undefined && data.email==email){
              localStorage.setItem("accessToken",data.token);
              localStorage.setItem("roles",data.roles);
              localStorage.setItem("user",data.username);
              localStorage.setItem("email", data.email);
              localStorage.setItem("userID",data.id);
              this.isAuth = data.username;
              this.authService.getRoles(data.id).subscribe((roleName:any)=>{
                this.roles = roleName;
              },error => {

              });
              this.router.navigate(['/admin/list-membre']);
            }
          }, error => {
            this.errorMessage = "Error email or pasword incorrect"
          });
      }
      //this.router.navigate(['/admin/list-membre']);
    },error => {
      this.errorMessage = "Error Votre n'est pas activé"
    })
  }

  signIn1(){
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    let code:any = localStorage.getItem("code");
    this.authService.signInUser(email, password).subscribe({
      next:(data:any)=>{
        this.userService.getUserByCode(code).subscribe(userData=>{
            this.utilisateurModel= userData;
            if (this.utilisateurModel.enabled){
              if(data.token!=undefined && data.email==email){
                localStorage.setItem("accessToken",data.token);
                localStorage.setItem("roles",data.roles);
                localStorage.setItem("user",data.username);
                localStorage.setItem("email", data.email);
                localStorage.setItem("userID",data.id);
                this.authService.getRoles(data.id).subscribe((roleName:any)=>{
                  this.roles = roleName;
                });
                this.isAuth = data.username;
              }
              this.router.navigate(['/admin/list-membre']);
            }
          },
          error => {
            this.errorMessage = "Error Votre n'est pas activé"
          })

      },
      error: err => {
         this.errorMessage = "Error email or pasword incorrect"
      }
    });
  }

}
