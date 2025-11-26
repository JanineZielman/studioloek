"use client";
import { useEffect, useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

export const Layout = ({ children, nav }) => {
  const [hash, setHash] = useState(
    typeof window !== "undefined" ? window.location.hash : ""
  );

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="container">
      <nav>
        {nav.data.menu.map((item, i) => {
          const href = item.link.url?.startsWith("/")
            ? item.link.url
            : `/${item.link.url}`;

          const isActive = hash === `${href.replace("/", "")}`;

          return (
            <a href={href} key={`nav${i}`} className={isActive ? "active" : ""}>
              {item.link.text}
            </a>
          );
        })}
      </nav>

      {children}

      <footer id="contact">
        <div className="columns">
          {nav.data.footer.map((item, i) => (
            <div className="column" key={`column${i}`}>
              <PrismicRichText field={item.column} />
            </div>
          ))}
        </div>
         <Link href="/"><img className="footer-logo" src="/blue-logo-studioloek.svg"/></Link>
      </footer>
    </div>
  );
};
