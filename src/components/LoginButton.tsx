"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";

type Props = {};

const LoginButton = (props: Props) => {
  const closeDialog = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full justify-center flex-col">
          <h2 className="font-bold text-gray-900 text-xl">Login</h2>
          <p className="text-muted-foreground text-sm">
            Accedi per usare tutte le funzionalità della piattaforma
          </p>
        </div>

        <div className="mt-4">
          <Tabs defaultValue="account" className="w-full">
            <TabsList defaultValue="login" className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex-1">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1">
                Registrati
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm closeDialog={closeDialog} />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm closeDialog={closeDialog} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
