"use client";

import {
  blogMenu,
  homes,
  monoShop,
  otherPages,
  propertyLinks,
} from "@/data/menu";
import MobileMenuAuth from "@/components/headers/MobileMenuAuth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

function isExternalHref(href) {
  return typeof href === "string" && /^https?:\/\//i.test(href);
}

export default function MobileMenu() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const authed = status === "authenticated" && Boolean(session?.user);

  const isParentActive = (menus) =>
    menus.some((menu) =>
      menu.submenu
        ? menu.submenu.some((item) =>
            item.submenu
              ? item.submenu.some(
                  (seg) => seg.href.split("/")[1] === pathname.split("/")[1],
                )
              : item.href.split("/")[1] === pathname.split("/")[1],
          )
        : menu.href.split("/")[1] === pathname.split("/")[1],
    );

  const buscarTitle = propertyLinks[0]?.title ?? "Buscar un mono";
  const communityOuter =
    otherPages.length === 1 && otherPages[0].submenu
      ? otherPages[0].title
      : "Comunidad";

  return (
    <div
      className="offcanvas offcanvas-start mobile-nav-wrap"
      tabIndex={-1}
      id="menu-mobile"
      aria-labelledby="menu-mobile"
    >
      <div className="offcanvas-header top-nav-mobile">
        <div className="offcanvas-title">
          <Link href={`/`}>
            <Image
              alt=""
              src="/images/logo/logo@2x.png"
              width={272}
              height={84}
            />
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas" aria-label="Cerrar">
          <i className="icon-close" />
        </div>
      </div>
      <div className="offcanvas-body inner-mobile-nav">
        <MobileMenuAuth />
        <div className="mb-body">
          <ul id="menu-mobile-menu">
            {homes.length === 1 ? (
              <li
                className={`menu-item ${
                  pathname === homes[0].href ? "current-item" : ""
                }`}
              >
                <Link href={homes[0].href} className="tem-menu-mobile">
                  {homes[0].label}
                </Link>
              </li>
            ) : (
              <li
                className={`menu-item menu-item-has-children-mobile  ${
                  homes.some((elm) => elm.href == pathname)
                    ? "current-menu-item"
                    : ""
                } `}
              >
                <a
                  href="#dropdown-menu-one"
                  className="item-menu-mobile collapsed"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-one"
                >
                  Inicio
                </a>
                <div
                  id="dropdown-menu-one"
                  className="collapse"
                  data-bs-parent="#menu-mobile-menu"
                >
                  <ul className="sub-mobile">
                    {homes.map((link, i) => (
                      <li
                        key={i}
                        className={
                          pathname == link.href
                            ? "menu-item current-item"
                            : "menu-item "
                        }
                      >
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )}

            <li
              className={`menu-item menu-item-has-children-mobile  ${
                isParentActive(propertyLinks) ? "current-menu-item" : ""
              } `}
            >
              <a
                href="#mobile-dd-buscar"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="mobile-dd-buscar"
              >
                {buscarTitle}
              </a>
              <div
                id="mobile-dd-buscar"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  {propertyLinks.flatMap((group) =>
                    group.submenu.map((link, i2) => (
                      <li
                        key={`${group.title}-${link.href}-${i2}`}
                        className={
                          pathname.split("/")[1] == link.href.split("/")[1]
                            ? "menu-item current-item"
                            : "menu-item "
                        }
                      >
                        {isExternalHref(link.href) ? (
                          <a
                            href={link.href}
                            className="item-menu-mobile"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="item-menu-mobile"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    )),
                  )}
                </ul>
              </div>
            </li>

            <li
              className={`menu-item menu-item-has-children-mobile   ${
                isParentActive(otherPages) ? "current-menu-item" : ""
              } `}
            >
              <a
                href="#mobile-dd-community"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="mobile-dd-community"
              >
                {communityOuter}
              </a>
              <div
                id="mobile-dd-community"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  {otherPages.flatMap((group, gi) =>
                    (group.submenu || []).map((link, i2) => (
                      <li
                        key={`${gi}-${link.href}-${i2}`}
                        className={`menu-item ${
                          link.href?.split("/")[1] == pathname.split("/")[1]
                            ? "current-item"
                            : ""
                        }`}
                      >
                        {isExternalHref(link.href) ? (
                          <a
                            href={link.href}
                            className="item-menu-mobile"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="item-menu-mobile"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    )),
                  )}
                </ul>
              </div>
            </li>

            <li className="menu-item">
              <a
                href={monoShop.href}
                className="tem-menu-mobile"
                target="_blank"
                rel="noopener noreferrer"
              >
                {monoShop.label}
              </a>
            </li>

            {blogMenu.length >= 1 ? (
              <li
                className={`menu-item ${
                  pathname.split("/")[1] === blogMenu[0].href.split("/")[1]
                    ? "current-item"
                    : ""
                }`}
              >
                <Link href={blogMenu[0].href} className="tem-menu-mobile">
                  {blogMenu[0].label}
                </Link>
              </li>
            ) : null}

            <li
              className={`menu-item ${
                pathname.split("/")[1] === "add-property"
                  ? "current-item"
                  : ""
              }`}
            >
              <Link href="/add-property" className="tem-menu-mobile">
                Publicar mi mono
              </Link>
            </li>

            {!authed && status !== "loading" ? (
              <li className="menu-item menu-item-has-children-mobile">
                <a
                  href="#mobile-dd-ingresar"
                  className="item-menu-mobile collapsed"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="mobile-dd-ingresar"
                >
                  Ingresar
                </a>
                <div
                  id="mobile-dd-ingresar"
                  className="collapse"
                  data-bs-parent="#menu-mobile-menu"
                >
                  <ul className="sub-mobile">
                    <li className="menu-item">
                      <a
                        href="#modalLogin"
                        className="item-menu-mobile"
                        data-bs-toggle="modal"
                        role="button"
                      >
                        Login
                      </a>
                    </li>
                    <li className="menu-item">
                      <a
                        href="#modalRegister"
                        className="item-menu-mobile"
                        data-bs-toggle="modal"
                        role="button"
                      >
                        Quiero ser un monero
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            ) : null}
          </ul>
          <div className="support">
            <a href="/contact" className="text-need">
              ¿Necesitás ayuda?
            </a>
            <ul className="mb-info">
              <li>
                <Link href="/contact">Escribinos</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
