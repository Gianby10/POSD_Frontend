import { z } from "zod";

// export type PrivacyPattern = {
//   titolo: string;
//   descrizione: string;
//   privacyStrategy: PrivacyStrategy | PrivacyStrategy[];
//   contesto: string;
//   collocazioneMVC: string;
//   gdprArticle?: GDPRArticle | GDPRArticle[];
//   privacyPrinciple: PrivacyPrinciple | PrivacyPrinciple[];
//   problema: string;
//   soluzione: string;
//   esempio: string;
//   cweWeakness?: CWEWeakness | CWEWeakness[];
// };

export type PrivacyPattern = {
  id: number;
  attributes: {
    titolo: string;
    descrizione: string;
    contesto: string;
    collocazione_MVC: string;
    problema: string;
    soluzione: string;
    esempio: string;
    fase_ISO_9241_210: string;
    privacy_strategy: {
      data: { id: number; attributes: { nome: string; descrizione: string } }[];
    };
    gdpr_article: {
      data: {
        id: number;
        attributes: { nome: string; link: string; numero: number }[];
      };
    };
    privacy_principle: {
      data: {
        id: number;
        attributes: { titolo: string; descrizione: string };
      };
    };
    cwe_weakness: {
      data: {
        id: number;
        attributes: { nome: string; descrizione: string; numero: number };
      };
    };
  };
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

export const formAddPatternSchema = z.object({
  titolo: z.string().min(1),
  descrizione: z.string().min(1),
  privacy_strategy: z.number().optional().array(),
  contesto: z.string().min(1),
  collocazione_MVC: z.string().min(1),
  gdpr_article: z.number().optional().array(),
  privacy_principle: z.number().optional().array(),
  problema: z.string().min(1),
  soluzione: z.string().min(1),
  esempio: z.string().min(1),
  cwe_weakness: z.number().optional().array(),
  owasp_category: z.number().optional().array(),
  fase_ISO_9241_210: z.string().min(1),
});

export const formAddArticleSchema = z.object({
  numero: z.string(),
  nome: z.string().min(1),
  link: z.string().url(),
});

export const formAddWeaknessSchema = z.object({
  numero: z.string(),
  nome: z.string().min(1),
  descrizione: z.string().min(1),
});
