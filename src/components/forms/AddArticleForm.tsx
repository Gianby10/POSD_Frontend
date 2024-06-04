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
import { formAddArticleSchema, formLoginSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import Link from "next/link";
import { ChevronsLeft, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { loginUserAction } from "@/lib/actions/auth-actions";
import { addArticle } from "@/lib/actions/pkb-actions";
type Props = {
  closeDialog: any;
};

const AddArticleForm = ({ closeDialog }: Props) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof formAddArticleSchema>) => {
    startTransition(async () => {
      const response = await addArticle(values);
      if (response?.error) {
        toast({
          title: "Errore",
          variant: "destructive",
          description: response.error,
        });
        return;
      }
      closeDialog();
    });
  };

  const form = useForm<z.infer<typeof formAddArticleSchema>>({
    resolver: zodResolver(formAddArticleSchema),
    defaultValues: {
      numero: undefined,
      nome: "",
      link: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          disabled={isPending}
          control={form.control}
          name="numero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero Articolo</FormLabel>
              <FormControl>
                <Input placeholder="12" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isPending}
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome articolo</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Security of Processing"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          disabled={isPending}
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link articolo</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://gdpr-info.eu/art-xx-gdpr/"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center">
          <Button disabled={isPending} type="submit" variant="outline">
            {isPending ? (
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
            ) : (
              "Continua"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddArticleForm;
