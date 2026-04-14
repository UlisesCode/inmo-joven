import { auth } from "@/auth";
import RootLayoutClient from "./RootLayoutClient";

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
