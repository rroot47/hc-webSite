export class UtilisateurModel{
  constructor(private id: number,
              private nom: string,
              private prenom: string,
              private email: string,
              private password: string,
              private roleName: string,
              private verificationCode: string,
              private enabled: boolean) {
  }
}
