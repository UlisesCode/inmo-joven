"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import React from "react";

/**
 * Login / registro (modales Bootstrap) y cuenta cuando hay sesión —
 * el header desktop usa HeaderAuthCta; en móvil el drawbar no los repetía.
 */
export default function MobileMenuAuth() {
  const { data: session, status } = useSession();
  const authed = status === "authenticated" && Boolean(session?.user);

  if (status === "loading") {
    return (
      <div
        className="mobile-menu-auth px-3 pb-3 border-bottom border-light"
        aria-busy="true"
        aria-label="Cargando sesión"
      >
        <div className="d-flex gap-2">
          <div
            className="tf-btn style-border flex-grow-1 disabled opacity-50"
            style={{ pointerEvents: "none" }}
          >
            …
          </div>
          <div
            className="tf-btn bg-color-primary flex-grow-1 disabled opacity-50"
            style={{ pointerEvents: "none" }}
          >
            …
          </div>
        </div>
      </div>
    );
  }

  if (authed) {
    return (
      <div className="mobile-menu-auth px-3 pb-3 border-bottom border-light d-flex flex-column gap-2">
        <Link className="tf-btn bg-color-primary text-center" href="/dashboard">
          Mi cuenta
        </Link>
        <Link className="tf-btn style-border text-center" href="/add-property">
          Publicar propiedad
        </Link>
        <button
          type="button"
          className="tf-btn style-border"
          onClick={() => void signOut({ callbackUrl: "/" })}
        >
          Salir
        </button>
      </div>
    );
  }

  return (
    <div className="mobile-menu-auth px-3 pb-3 border-bottom border-light">
      <div className="d-flex flex-column gap-2">
        <a
          className="tf-btn style-border text-center"
          href="#modalLogin"
          data-bs-toggle="modal"
          role="button"
        >
          Iniciar sesión
        </a>
        <a
          className="tf-btn bg-color-primary text-center"
          href="#modalRegister"
          data-bs-toggle="modal"
          role="button"
        >
          Registrarse
        </a>
      </div>
    </div>
  );
}
