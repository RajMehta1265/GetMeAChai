"use client";
import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({ children, session }) {
  return (
    <SessionProvider session={{user:{session}}}>
      {children}
    </SessionProvider>
  );
}
