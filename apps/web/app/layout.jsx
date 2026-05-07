import { auth } from "@/auth";
import RootLayoutClient from "./RootLayoutClient";

/** Sesión por cookie: sin esto Next puede cachear el shell y mostrar CTAs de “logueado” a todos en prod. */
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="es">
      <body className="popup-loader">
        <RootLayoutClient session={session}>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
