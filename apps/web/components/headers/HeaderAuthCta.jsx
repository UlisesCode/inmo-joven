"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

/**
 * CTA del header: sin sesión abre el login (Bootstrap modal #modalLogin);
 * con sesión, va a publicar propiedad.
 */
export default function HeaderAuthCta() {
  const { status } = useSession();
  const authed = status === "authenticated";

  if (authed) {
    return (
      <div className="btn-add">
        <Link className="tf-btn style-border pd-23" href="/add-property">
          Publicar propiedad
        </Link>
      </div>
    );
  }

  return (
    <div className="btn-add d-flex gap-2 align-items-center flex-wrap justify-content-end">
      <a
        className="tf-btn style-border pd-23"
        href="#modalLogin"
        data-bs-toggle="modal"
        role="button"
      >
        Iniciar sesión
      </a>
      <a
        className="tf-btn bg-color-primary pd-23"
        href="#modalRegister"
        data-bs-toggle="modal"
        role="button"
      >
        Registrarse
      </a>
    </div>
  );
}
