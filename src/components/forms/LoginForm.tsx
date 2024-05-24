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
import { formLoginSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import Link from "next/link";
import { ChevronsLeft, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { loginUserAction } from "@/lib/actions/auth-actions";
type Props = {
  closeDialog: any;
};

const LoginForm = ({ closeDialog }: Props) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof formLoginSchema>) => {
    startTransition(async () => {
      const response = await loginUserAction(values);
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

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          disabled={isPending}
          control={form.control}
          name="identifier"
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
        <div className="flex justify-between items-center">
          <Link
            href="http://localhost:4444/admin"
            className="flex text-[#3E52F9] hover:underline"
          >
            <ChevronsLeft className="" /> Continua come amministratore
          </Link>
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

export default LoginForm;
