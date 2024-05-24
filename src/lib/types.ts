import { z } from "zod";

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

export const formLoginSchema = z.object({
  identifier: z.string().email({ message: "Inserisci un'email valida" }),
  password: z
    .string()
    .min(6, { message: "La password dev'essere almeno di 6 caratteri" }),
});

export const formRegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: "L'username dev'essere almeno di 3 caratteri" }),
  email: z.string().email({ message: "Email non valida" }),
  name: z
    .string()
    .min(1, { message: "Il nome dev'essere almeno di 1 carattere" }),
  lastName: z
    .string()
    .min(1, { message: "Il cognome dev'essere almeno di 1 carattere" }),
  password: z
    .string()
    .min(6, { message: "La password dev'essere almeno di 6 caratteri" }),
});
