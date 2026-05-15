"use client";

import {
  blogMenu,
  homes,
  monoShop,
  otherPages,
  propertyLinks,
} from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

function isExternalHref(href) {
  return typeof href === "string" && /^https?:\/\//i.test(href);
}

export default function Nav() {
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

  const communityTriggerLabel =
    otherPages.length === 1 && otherPages[0].submenu
      ? otherPages[0].title
      : "Comunidad";

  const buscarTriggerLabel = propertyLinks[0]?.title ?? "Buscar un mono";

  return (
    <>
      {homes.length === 1 ? (
        <li className={pathname === homes[0].href ? "current-menu" : ""}>
          <Link href={homes[0].href}>{homes[0].label}</Link>
        </li>
      ) : (
        <li
          className={`has-child ${
            homes.some((elm) => elm.href == pathname) ? "current-menu" : ""
          }`}
        >
          <a href="#">Inicio</a>
          <ul className="submenu">
            {homes.map((item, index) => (
              <li
                key={index}
                className={pathname == item.href ? "current-item" : ""}
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </li>
      )}

      <li
        className={`has-child style-2 ${
          isParentActive(propertyLinks) ? "current-menu" : ""
        } `}
      >
        <a href="#">{buscarTriggerLabel}</a>
        <ul className="submenu">
          {propertyLinks.map((menu, index) => (
            <li key={index}>
              <a href="#">{menu.title}</a>
              <ul className="submenu2">
                {menu.submenu.map((item, subIndex) => (
                  <li
                    key={subIndex}
                    className={
                      pathname.split("/")[1] == item.href.split("/")[1]
                        ? "current-item"
                        : ""
                    }
                  >
                    {isExternalHref(item.href) ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li>

      <li
        className={`has-child  ${
          isParentActive(otherPages) ? "current-menu" : ""
        } `}
      >
        <a href="#">{communityTriggerLabel}</a>
        <ul className="submenu">
          {otherPages.map((menu, index) => (
            <li
              key={index}
              className={`${menu.className || ""}  ${
                isParentActive(menu.submenu || []) ? "current-item" : ""
              }   ${
                menu.href?.split("/")[1] == pathname.split("/")[1]
                  ? "current-item"
                  : ""
              } `}
            >
              {menu.submenu ? (
                <>
                  <a href="#">{menu.title}</a>
                  <ul className="submenu">
                    {menu.submenu.map((item, subIndex) => (
                      <li
                        key={subIndex}
                        className={
                          item.href?.split("/")[1] == pathname.split("/")[1]
                            ? "current-item"
                            : ""
                        }
                      >
                        {isExternalHref(item.href) ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link href={item.href}>{item.label}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link href={menu.href}>{menu.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </li>

      <li>
        <a
          href={monoShop.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {monoShop.label}
        </a>
      </li>

      {blogMenu.length === 1 ? (
        <li
          className={
            pathname.split("/")[1] === blogMenu[0].href.split("/")[1]
              ? "current-menu"
              : ""
          }
        >
          <Link href={blogMenu[0].href}>{blogMenu[0].label}</Link>
        </li>
      ) : blogMenu.length > 1 ? (
        <li
          className={`has-child ${
            isParentActive(blogMenu) ? "current-menu" : ""
          } `}
        >
          <a href="#">Blog</a>
          <ul className="submenu">
            {blogMenu.map((item, index) => (
              <li
                key={index}
                className={
                  item.href.split("/")[1] == pathname.split("/")[1]
                    ? "current-item"
                    : ""
                }
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </li>
      ) : null}

      <li
        className={
          pathname.split("/")[1] === "add-property" ? "current-menu" : ""
        }
      >
        <Link href="/add-property">Publicar mi mono</Link>
      </li>

      {!authed && status !== "loading" ? (
        <li className="has-child nav-ingresar">
          <a href="#">Ingresar</a>
          <ul className="submenu">
            <li>
              <a
                href="#modalLogin"
                data-bs-toggle="modal"
                role="button"
                className="nav-modal-link"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="#modalRegister"
                data-bs-toggle="modal"
                role="button"
                className="nav-modal-link"
              >
                Quiero ser un monero
              </a>
            </li>
          </ul>
        </li>
      ) : null}
    </>
  );
}
