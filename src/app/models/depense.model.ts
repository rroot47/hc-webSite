import {TypedepenseEnum} from "../enums/typedepense.enum";

export class DepenseModel{
  constructor(
    public typeDepense:string,
    public description:string,
    public nom:string,
    public prenom:string,
    public date:string,
    public somme:number
  ) {
  }
}
