import { auth } from "@/auth";
import RootLayoutClient from "./RootLayoutClient";

/** Sesión por cookie: sin esto Next puede cachear el shell y mostrar CTAs de “logueado” a todos en prod. */
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const raw = await auth();
  // Solo pasar sesión al cliente si hay usuario (evita estados raros de Auth.js / caché).
  const session = raw?.user ? raw : null;

  return (
    <html lang="es">
      <body className="popup-loader">
        <RootLayoutClient session={session}>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
