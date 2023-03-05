import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {SignupModels} from "../models/signup.models";
import {API_BASE_URL} from "../constants/baseUrl.constant";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  url:String = "http://ec2-3-90-80-27.compute-1.amazonaws.com:8082";
  constructor(private http: HttpClient, private router: Router){}

  signInUser(email:string, password:string ):Observable<SignupModels>{
    let body = {email:email, password:password}
    return  this.http.post(API_BASE_URL+"/auth/signin", body);
  }

  getRoles(id:number){
    return this.http.get(API_BASE_URL+"/hc/role/"+id);
  }

}
