"use server";

import { z } from "zod";
import { loginUserService, registerUserService } from "../auth";
import { formLoginSchema, formRegisterSchema } from "../types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 1 Settimana
  path: "/",
  domain: process.env.NEXT_PUBLIC_APP_HOST || "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
export async function registerUserAction(
  values: z.infer<typeof formRegisterSchema>
) {
  const validatedFields = formRegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      error: "Errore durante la registrazione.",
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      error: "Ops! Qualcosa è andato storto. Riprova più tardi.",
      zodErrors: null,
    };
  }

  if (responseData.error) {
    console.log(responseData.error);
    return {
      error: "Ops! Qualcosa è andato storto. Riprova più tardi.",
      zodErrors: null,
    };
  }

  console.log("---");
  console.log("Utente Registrato correttamente! TOKEN:", responseData.jwt);
  console.log("---");
  cookies().set("jwt", responseData.jwt, cookieConfig);

  redirect("/patterns");
}

export async function loginUserAction(values: z.infer<typeof formLoginSchema>) {
  const validatedFields = formLoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      error: "Errore durante il login.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      error: "Ops! Qualcosa è andato storto. Riprova più tardi.",
      zodErrors: null,
    };
  }

  if (responseData.error) {
    console.log(responseData.error);
    if (responseData.error.name === "ValidationError") {
      return {
        error: "Email o password non valide.",
        zodErrors: null,
      };
    }
    return {
      error: "Ops! Qualcosa è andato storto. Riprova più tardi.",
      zodErrors: null,
    };
  }

  console.log("---");
  console.log("Utente LOGGATO correttamente! TOKEN:", responseData.jwt);
  console.log("---");
  cookies().set("jwt", responseData.jwt, cookieConfig);

  redirect("/");
}

export const logoutAction = () => {
  cookies().set("jwt", "", { ...cookieConfig, maxAge: 0 });
  redirect("/");
};
