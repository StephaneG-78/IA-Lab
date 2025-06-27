export interface Participation {
  id: string;
  pseudo: string;
  ville: string;
  type: 'question' | 'contribution';
  titre: string;
  message: string;
  fichierPdf?: File;
  fileName?: string;
  status: 'en-attente' | 'publiee';
  dateCreation: string;
  reponse?: string;
  dateReponse?: string;
}

export interface User {
  username: string;
  password: string;
  role: 'admin';
}