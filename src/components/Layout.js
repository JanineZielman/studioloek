"use client";
import { useEffect, useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Next 13 App Router

export const Layout = ({ children, nav }) => {
const pathname = usePathname();
const [activeSection, setActiveSection] = useState("");

// IntersectionObserver for in-page anchors
useEffect(() => {
const sections = document.querySelectorAll("[id]");
if (!sections.length) return;


const observer = new IntersectionObserver(
  (entries) => {
    let found = false;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
        found = true;
      }
    });
    if (!found) setActiveSection("");
  },
  {
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0,
  }
);

sections.forEach((sec) => observer.observe(sec));

return () => observer.disconnect();


}, []);

return ( <div className="container"> <nav>
{nav.data.menu.map((item, i) => {
const href = item.link.url || "";
const isAnchor = href.startsWith("#");
let isActive = false;


      if (isAnchor) {
        const targetId = href.replace("#", "");
        isActive = activeSection === targetId;
      } else {
        // Normal page link → highlight if pathname matches
        const linkPath = href.startsWith("/") ? href : `/${href}`;
        isActive = pathname === linkPath;
      }

      return (
        <a key={`nav${i}`} href={isAnchor ? `/${href}` : href} className={isActive ? "active" : ""}>
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
    <Link href="/">
      <img className="footer-logo" src="/blue-logo-studioloek.svg" />
    </Link>
  </footer>
</div>


);
};
