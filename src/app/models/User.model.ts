export  class UserModel{
  constructor(
    public nom:string,
    public prenom: string,
    public telephone:number,
    public domicile : string,
    public montantAdhesion : number,
    public adherant : string[],
  ) {
  }
}

