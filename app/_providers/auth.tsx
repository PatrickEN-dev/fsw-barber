"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: IChildrenComponent) => (
  <SessionProvider>{children}</SessionProvider>
);

export default AuthProvider;
