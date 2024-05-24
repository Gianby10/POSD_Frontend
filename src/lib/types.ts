export type PrivacyPattern = {
  titolo: string;
  descrizione: string;
  privacyStrategy: PrivacyStrategy | PrivacyStrategy[];
  contesto: string;
  collocazioneMVC: string;
  gdprArticle?: GDPRArticle | GDPRArticle[];
  privacyPrinciple: PrivacyPrinciple | PrivacyPrinciple[];
  problema: string;
  soluzione: string;
  esempio: string;
  cweWeakness?: CWEWeakness | CWEWeakness[];
};

export type PrivacyPrinciple = {
  id: number;
  titolo: string;
  descrizione: string;
};

export type PrivacyStrategy = {
  id: number;
  nome: string;
  descrizione: string;
};

export type OWASPCategory = {
  id: number;
  numero: number;
  nome: string;
  descrizione: string;
};

export type CWEWeakness = {
  id: number;
  numero: number;
  nome: string;
  descrizione: string;
};

export type GDPRArticle = {
  id: number;
  numero: number;
  nome: string;
};
