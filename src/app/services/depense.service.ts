import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_BASE_URL} from "../constants/baseUrl.constant";
import {DepenseModel} from "../models/depense.model";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  constructor(private http: HttpClient) {
  }

  getDepenses():Observable<DepenseModel>{
    return this.http.get<DepenseModel>(API_BASE_URL+"/hc/depenses");
  }
  getSommeTotals(){
    return this.http.get(API_BASE_URL+"/hc/membre/montantTotal");
  }

  getSommeTotalsDepense(){
    return this.http.get(API_BASE_URL+"/hc/totalDepense");
  }

  addDepense(depenseModel: DepenseModel){
    return this.http.post(API_BASE_URL+"/hc/depense", depenseModel);
  }


}
