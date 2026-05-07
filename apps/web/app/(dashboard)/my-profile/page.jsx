import Profile from "@/components/dashboard/Profile";
import React from "react";

export const metadata = {
  title: "Mi perfil | Monoambiente",
  description: "Datos personales y preferencias de tu cuenta.",
};
export default function page() {
  return (
    <>
      <Profile />
    </>
  );
}
