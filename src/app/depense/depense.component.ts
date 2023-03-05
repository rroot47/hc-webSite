import { Component, OnInit } from '@angular/core';
import {DepenseService} from "../services/depense.service";
import {DepenseModel} from "../models/depense.model";

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {

  sommeTT!:number;
  sommeTTDepense!:number;
  depenseModel:DepenseModel[] | any;

  constructor(private depenseService:DepenseService) { }

  ngOnInit(): void {
    this.getDepenses();
    this.getSommeTotals();
    this.getSommeTotalsDepense();
  }

  getDepenses(){
    return this.depenseService.getDepenses().subscribe((data:DepenseModel)=>{
      this.depenseModel = data;
    })
  }
  getSommeTotals(){
    return this.depenseService.getSommeTotals().subscribe((montant:any)=>{
      this.sommeTT = montant;
    });
  }

  getSommeTotalsDepense(){
    return this.depenseService.getSommeTotalsDepense().subscribe((depense:any)=>{
      this.sommeTTDepense = depense;
    })
  }
}
