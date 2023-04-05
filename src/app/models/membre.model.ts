export interface Membre {
  currentPage:   number;
  totalPages:    number;
  pageSize:      number;
  allMemberDTOS: AllMemberDTO[];
}

export interface AllMemberDTO {
  id:              number;
  nom:             string;
  prenom:          string;
  telephone:       number;
  domicile:        string;
  montantAdhesion: number;
  adherant:        Adherant[];
  montantTotals:   number;
}

export interface Adherant {
  annee:   number;
  montant: number;
}
