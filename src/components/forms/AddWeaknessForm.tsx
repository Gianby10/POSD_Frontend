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
import {
  formAddArticleSchema,
  formAddWeaknessSchema,
  formLoginSchema,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import Link from "next/link";
import { ChevronsLeft, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { loginUserAction } from "@/lib/actions/auth-actions";
import { addArticle, addWeakness } from "@/lib/actions/pkb-actions";
import { Textarea } from "../ui/textarea";
type Props = {
  closeDialog: any;
};

const AddWeaknessForm = ({ closeDialog }: Props) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof formAddWeaknessSchema>) => {
    startTransition(async () => {
      const response = await addWeakness(values);
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

  const form = useForm<z.infer<typeof formAddWeaknessSchema>>({
    resolver: zodResolver(formAddWeaknessSchema),
    defaultValues: {
      numero: undefined,
      nome: "",
      descrizione: "",
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
              <FormLabel>Numero vulenerabilità CWE</FormLabel>
              <FormControl>
                <Input placeholder="306" type="number" {...field} />
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
              <FormLabel>Nome vulnerabilità CWE</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Missing Authentication for Critical Function"
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
          name="descrizione"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descizione vulnerabilità CWE</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrizione..." {...field} />
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

export default AddWeaknessForm;
