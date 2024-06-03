"use server";

import { z } from "zod";
import { getUserMeLoader } from "../auth";
import { formAddPatternSchema } from "../types";
import axios from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const addPattern = async (
  values: z.infer<typeof formAddPatternSchema>
) => {
  const user = await getUserMeLoader();
  if (!user.ok) {
    return {
      error: "Utente non autenticato!",
    };
  }
  const userToken = cookies().get("jwt")?.value;
  console.log(userToken);
  const { success, data } = formAddPatternSchema.safeParse(values);
  if (!success) {
    return {
      error: "Controlla i dati inseriti e riprova!",
    };
  }
  const {
    titolo,
    collocazione_MVC,
    contesto,
    cwe_weakness,
    descrizione,
    esempio,
    fase_ISO_9241_210,
    gdpr_article,
    privacy_principle,
    privacy_strategy,
    problema,
    soluzione,
  } = data;

  try {
    const r = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/privacy-patterns`,
      {
        data: {
          titolo,
          collocazione_MVC,
          contesto,
          cwe_weakness,
          descrizione,
          esempio,
          fase_ISO_9241_210,
          gdpr_article,
          privacy_principle,
          privacy_strategy,
          problema,
          soluzione,
          publishedAt: null, // Pubblica in draft mode
        },
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  } catch (error) {
    return {
      error: "Errore sconosciuto. Riprova tra qualche minuto!",
    };
  }

  return {
    success: true,
  };
};

export const addLike = async (userId: number, patternId: string) => {
  const user = await getUserMeLoader();
  if (!user.ok) {
    return {
      error: "Utente non autenticato!",
    };
  }
  const userToken = cookies().get("jwt")?.value;
  try {
    const a = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/feedbacks`,
      {
        data: {
          isLike: true,
          users_permissions_user: userId,
          privacy_pattern: patternId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  } catch (error) {
    return {
      error: "Errore",
    };
  }
  revalidatePath("/patterns/" + patternId);
};

export const addDislike = async (userId: number, patternId: string) => {
  const user = await getUserMeLoader();
  if (!user.ok) {
    return {
      error: "Utente non autenticato!",
    };
  }
  const userToken = cookies().get("jwt")?.value;
  try {
    const a = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/feedbacks`,
      {
        data: {
          isLike: false,
          users_permissions_user: userId,
          privacy_pattern: patternId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  } catch (error) {
    return {
      error: "Errore",
    };
  }
  revalidatePath("/patterns/" + patternId);
};

export const removeDislike = async (userId: number, patternId: string) => {
  const user = await getUserMeLoader();
  if (!user.ok) {
    return {
      error: "Utente non autenticato!",
    };
  }
  const userToken = cookies().get("jwt")?.value;
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/feedbacks?filters[privacy_pattern][$in]=${patternId}&filters[users_permissions_user][$in]=${userId}&filters[isLike][$eq]=false`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    const feedbackId = data.data.data?.[0]?.id;
    console.log(feedbackId);
    if (feedbackId) {
      axios.delete(
        `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/feedbacks/${feedbackId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    }
  } catch (error) {
    // console.log(error);
    return {
      error: "Errore",
    };
  }
  revalidatePath("/patterns/" + patternId);
};

export const removeLike = async (userId: number, patternId: string) => {
  const user = await getUserMeLoader();
  if (!user.ok) {
    return {
      error: "Utente non autenticato!",
    };
  }
  const userToken = cookies().get("jwt")?.value;
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/feedbacks?filters[privacy_pattern][$in]=${patternId}&filters[users_permissions_user][$in]=${userId}&filters[isLike][$eq]=true`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    const feedbackId = data.data.data?.[0]?.id;
    console.log(feedbackId);
    if (feedbackId) {
      axios.delete(
        `${process.env.NEXT_PUBLIC_STRAPI_API_BASE_URL}/feedbacks/${feedbackId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    }
  } catch (error) {
    // console.log(error);
    return {
      error: "Errore",
    };
  }
  revalidatePath("/patterns/" + patternId);
};
