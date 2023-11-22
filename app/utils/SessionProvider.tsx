"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
  children: any
};

const AuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
