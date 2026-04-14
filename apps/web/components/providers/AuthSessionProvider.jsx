"use client";

import { SessionProvider } from "next-auth/react";

/** Sesión inicial desde el servidor evita el flash de useSession() en `loading`. */
export default function AuthSessionProvider({ children, session }) {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}
