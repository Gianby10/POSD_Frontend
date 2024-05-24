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
import { formLoginSchema, formRegisterSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import Link from "next/link";
import { ChevronsLeft, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { registerUserAction } from "@/lib/actions/auth-actions";
import { useToast } from "../ui/use-toast";
type Props = {
  closeDialog: any;
};

const RegisterForm = ({ closeDialog }: Props) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof formRegisterSchema>) => {
    startTransition(async () => {
      const response = await registerUserAction(values);
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

  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          disabled={isPending}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Mario" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isPending}
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cognome</FormLabel>
              <FormControl>
                <Input placeholder="Rossi" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isPending}
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="MarioRossi10" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isPending}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="mario@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isPending}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
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

export default RegisterForm;
