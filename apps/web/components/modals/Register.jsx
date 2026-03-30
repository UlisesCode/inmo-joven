"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

async function hideBootstrapModal(elementId) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(elementId);
  if (!el) return;
  const { Modal } = await import("bootstrap");
  const instance = Modal.getInstance(el) ?? new Modal(el);
  instance.hide();
}

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim().toLowerCase(),
          password,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "No se pudo registrar.");
        setLoading(false);
        return;
      }
      const sign = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });
      if (sign?.error) {
        setError("Cuenta creada. Iniciá sesión manualmente.");
        setLoading(false);
        await hideBootstrapModal("modalRegister");
        return;
      }
      await hideBootstrapModal("modalRegister");
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      router.refresh();
      router.push("/dashboard");
    } catch {
      setError("Error de red. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal modal-account fade" id="modalRegister">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="flat-account">
            <div className="banner-account">
              <Image
                alt="banner"
                width={380}
                height={858}
                src="/images/section/banner-register.jpg"
              />
            </div>
            <form className="form-account" onSubmit={handleSubmit}>
              <div className="title-box">
                <h4>Crear cuenta</h4>
                <span
                  className="close-modal icon-close"
                  data-bs-dismiss="modal"
                />
              </div>
              {error ? (
                <p className="text-danger px-3 mb-0 small" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="box">
                <fieldset className="box-fieldset">
                  <label htmlFor="registerName">Nombre (opcional)</label>
                  <div className="ip-field">
                    <input
                      type="text"
                      className="form-control"
                      id="registerName"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(ev) => setName(ev.target.value)}
                      autoComplete="name"
                    />
                  </div>
                </fieldset>
                <fieldset className="box-fieldset">
                  <label htmlFor="registerEmail">Email</label>
                  <div className="ip-field">
                    <input
                      type="email"
                      className="form-control"
                      id="registerEmail"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                </fieldset>
                <fieldset className="box-fieldset">
                  <label htmlFor="registerPassword">Contraseña</label>
                  <div className="ip-field">
                    <input
                      type="password"
                      className="form-control"
                      id="registerPassword"
                      placeholder="Mínimo 8 caracteres"
                      value={password}
                      onChange={(ev) => setPassword(ev.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>
                </fieldset>
                <fieldset className="box-fieldset">
                  <label htmlFor="registerConfirm">Confirmar contraseña</label>
                  <div className="ip-field">
                    <input
                      type="password"
                      className="form-control"
                      id="registerConfirm"
                      placeholder="Repetí la contraseña"
                      value={confirm}
                      onChange={(ev) => setConfirm(ev.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>
                </fieldset>
              </div>
              <div className="box box-btn">
                <button
                  type="submit"
                  className="tf-btn bg-color-primary w-full"
                  disabled={loading}
                >
                  {loading ? "Creando cuenta…" : "Registrarme"}
                </button>
                <div className="text text-center">
                  ¿Ya tenés cuenta?{" "}
                  <a
                    href="#modalLogin"
                    data-bs-toggle="modal"
                    className="text-color-primary"
                  >
                    Iniciar sesión
                  </a>
                </div>
              </div>
              <p className="box text-center caption-2 text-muted small">
                Registro con redes sociales (próximamente)
              </p>
              <div className="group-btn">
                <button
                  type="button"
                  className="btn-social"
                  disabled
                  style={{ opacity: 0.5 }}
                >
                  Google
                </button>
                <button
                  type="button"
                  className="btn-social"
                  disabled
                  style={{ opacity: 0.5 }}
                >
                  Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
