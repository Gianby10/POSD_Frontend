"use client";
import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { formAddPatternSchema, formLoginSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import Link from "next/link";
import { ChevronsLeft, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { loginUserAction } from "@/lib/actions/auth-actions";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { addPattern } from "@/lib/actions/pkb-actions";
import { redirect } from "next/navigation";
import AddArticle from "./AddPatternElement";
import AddPatternElement from "./AddPatternElement";
type Props = {
  articles: {
    id: number;
    attributes: {
      nome: string;
      numero: number;
      link: string;
    };
  }[];

  strategies: {
    id: number;
    attributes: {
      nome: string;
      descrizione: string;
    };
  }[];

  principles: {
    id: number;
    attributes: {
      titolo: string;
      descrizione: string;
    };
  }[];

  weaknesses: {
    id: number;
    attributes: {
      nome: string;
      numero: number;
      descrizione: string;
    };
  }[];

  owaspCategories: {
    id: number;
    attributes: {
      nome: string;
      numero: number;
      descrizione: string;
    };
  }[];
};

const AddPatternForm = ({
  articles,
  principles,
  strategies,
  weaknesses,
  owaspCategories,
}: Props) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof formAddPatternSchema>) => {
    console.log(values);
    startTransition(async () => {
      const response = await addPattern(values);
      if (response?.error) {
        toast({
          title: "Errore",
          variant: "destructive",
          description: response.error,
        });
        return;
      }
      toast({
        title: "Successo!",
        description:
          "Pattern inviato. Attendi che un amministratore approvi il pattern!",
      });
      redirect("/patterns");
    });
  };

  const form = useForm<z.infer<typeof formAddPatternSchema>>({
    resolver: zodResolver(formAddPatternSchema),
    defaultValues: {
      titolo: "",
      descrizione: "",
      privacy_strategy: [],
      contesto: "",
      collocazione_MVC: "",
      gdpr_article: [],
      privacy_principle: [],
      problema: "",
      soluzione: "",
      esempio: "",
      cwe_weakness: [],
      fase_ISO_9241_210: "",
      owasp_category: [],
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          disabled={isPending}
          control={form.control}
          name="titolo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titolo</FormLabel>
              <FormControl>
                <Input placeholder="Titolo pattern" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isPending}
          control={form.control}
          name="descrizione"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrizione</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrizione pattern" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="gdpr_article"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1">
                <FormLabel>Articoli GDPR</FormLabel>
                <AddPatternElement type="article" />
              </div>
              {articles.map((article) => (
                <FormField
                  key={article.id}
                  control={form.control}
                  name="gdpr_article"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={article.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(article.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, article.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== article.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Art. {article.attributes.numero} -{" "}
                          {article.attributes.nome}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 lg:flex justify-start items-center gap-4">
          <FormField
            disabled={isPending}
            control={form.control}
            name="privacy_principle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Principi di design</FormLabel>
                {principles.map((principle) => (
                  <FormField
                    key={principle.id}
                    control={form.control}
                    name="privacy_principle"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={principle.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(principle.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      principle.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== principle.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {principle.attributes.titolo}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isPending}
            control={form.control}
            name="privacy_strategy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strategie</FormLabel>
                {strategies.map((strategy) => (
                  <FormField
                    key={strategy.id}
                    control={form.control}
                    name="privacy_strategy"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={strategy.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(strategy.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      strategy.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== strategy.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {strategy.attributes.nome}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          disabled={isPending}
          control={form.control}
          name="contesto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contesto</FormLabel>
              <FormControl>
                <Textarea placeholder="Contesto pattern" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="collocazione_MVC"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collocazione MVC</FormLabel>
              <FormControl>
                <Input placeholder="Collocazione MVC pattern" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="fase_ISO_9241_210"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fase ISO 9241-210</FormLabel>
              <FormControl>
                <Input placeholder="Fase ISO 9241-210 pattern" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="problema"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problema</FormLabel>
              <FormControl>
                <Textarea placeholder="Problema pattern" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="soluzione"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Soluzione</FormLabel>
              <FormControl>
                <Textarea placeholder="Soluzione pattern" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="cwe_weakness"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1">
                <FormLabel>Vulnerabilià CWE</FormLabel>
                <AddPatternElement type="weakness" />
              </div>
              {weaknesses.map((weakness) => (
                <FormField
                  key={weakness.id}
                  control={form.control}
                  name="cwe_weakness"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={weakness.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(weakness.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, weakness.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== weakness.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          CWE-{weakness.attributes.numero}:{" "}
                          {weakness.attributes.nome}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="owasp_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categorie OWASP Associate</FormLabel>
              {owaspCategories.map((owaspCategory) => (
                <FormField
                  key={owaspCategory.id}
                  control={form.control}
                  name="owasp_category"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={owaspCategory.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(owaspCategory.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...field.value,
                                    owaspCategory.id,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== owaspCategory.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          A
                          {owaspCategory.attributes.numero < 10
                            ? "0" + owaspCategory.attributes.numero
                            : owaspCategory.attributes.numero}
                          : {owaspCategory.attributes.nome}:
                          {owaspCategory.attributes.nome}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="esempio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Esempi:</FormLabel>
              <FormControl>
                <Textarea placeholder="Esempi pattern" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center">
          <Button variant="default" type="submit">
            {isPending ? (
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
            ) : (
              "Invia"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPatternForm;
