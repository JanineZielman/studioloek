"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { motion } from "framer-motion";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

export const ProjectItems = ({ items }) => {
  const [filter, setFilter] = useState("all");
  const [isSticky, setIsSticky] = useState(true);
  const containerRef = useRef(null);

  const rotations = useMemo(
    () => items.map(() => (Math.random() * 10 - 5).toFixed(2)),
    [items]
  );

  const filteredItems = useMemo(() => {
    const now = new Date();
    return items.filter((item) => {
      const itemDate = new Date(item.data.date);
      if (filter === "upcoming") return itemDate > now;
      if (filter === "past") return itemDate < now;
      return true;
    });
  }, [items, filter]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const topOffset = 80; // same as filters top spacing
      // Sticky if the container is still visible in viewport
      if (rect.top <= topOffset && rect.bottom > topOffset) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    handleScroll(); // run on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="projects-container">
      <div className={`filters ${isSticky ? "sticky" : ""}`}>
        {["all", "upcoming", "past"].map((f) => (
          <div
            key={f}
            onClick={() => setFilter(f)}
            className={`filter ${filter === f ? "active" : ""}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </div>
        ))}
      </div>

      <div className="projects" id="projecten">
        {filteredItems.map((item, i) => {
          const d = new Date(item.data.date);
          const year = d.getFullYear();

          return (
            <motion.div
              key={`img${i}`}
              style={{ rotate: Number(rotations[i]) }}
              initial={{ y: 100 }}
              whileInView={{
                y: 0,
                transition: { duration: 1, ease: "easeIn" },
              }}
              viewport={{ once: false, amount: 0.3 }}
              className="imgContainer"
            >
              <Link href={`/project/${item.uid}`}>
                {item.data.meegewerkt_aan && (
                  <div className="label">Meegewerkt Aan</div>
                )}
                <PrismicNextImage field={item.data.preview_image} />
                <div className="title">
                  <PrismicRichText field={item.data.title} />
                  <div className="year">{year}</div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
