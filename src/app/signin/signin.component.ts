import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

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

  constructor(
    private formBuilder:FormBuilder,
    private  authService:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signInForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required]]// Validators.pattern(/[0-9a-zA-Z]{6,}/)
    });
  }

  signIn(){
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authService.signInUser(email, password).subscribe({
      next:(data:any)=>{
        if(data.token!=undefined && data.email==email){
          localStorage.setItem("accessToken",data.token);
          localStorage.setItem("roles",data.roles);
          localStorage.setItem("user",data.username);
          localStorage.setItem("email", data.email);
          localStorage.setItem("userID",data.id);
          this.authService.getRoles(data.id).subscribe((roleName:any)=>{
            this.roles = roleName;
          });
          this.router.navigate(['/admin/list-membre']);
          this.isAuth = data.username;

        }

      },
      error: err => {
        this.errorMessage = "Error email or pasword incorrect"
      }
    });
  }

}
