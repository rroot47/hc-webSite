import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserInterface, UserModel} from "../models/User.model";
import {API_BASE_URL} from "../constants/baseUrl.constant";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:String = "http://ec2-3-90-80-27.compute-1.amazonaws.com:8082";
  userModel!: UserModel
  //"http://localhost:8082/hc/membre"
  constructor(private http: HttpClient) {
  }

  addAdherent(userModel: UserModel){
    return this.http.post(API_BASE_URL+"/hc/membre", userModel);
  }

  updateAdherant(id:number, userModel: UserModel){
    return this.http.patch(API_BASE_URL+"/hc/membre/"+id, userModel);
  }

  getMembre(id:number):Observable<UserModel>{
    return this.http.get<UserModel>(API_BASE_URL+"/hc/membre/"+id);
  }

  getAllMembres():Observable<UserModel> {
    return this.http.get<UserModel>(API_BASE_URL+"/hc/membres")
  }

  getPageMembres(pageNumber:number, pageSize:number){
    return this.http.get(API_BASE_URL+"/hc/pagemembres/"+pageNumber+"/"+pageSize)
  }

  addUser(nom:string, prenom:string, email:string, password:string, confirmPassword:string){
    let body = {nom:nom, prenom:prenom, email:email, password:password, confirmPassword:confirmPassword};
    return this.http.post(API_BASE_URL+"/hc/user",body);
  }


  getUserByCode(code:string){
    let codeVerification = new HttpParams().set('code', code);
    return this.http.get(API_BASE_URL+"/hc/user",{params:codeVerification});
  }

  verifyUser(code:string){
    let codeVerification = new HttpParams().set('code', code);
    return this.http.get(API_BASE_URL+"/hc/verify",{params:codeVerification});
  }
}
