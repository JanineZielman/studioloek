"use client"
import { FC, useMemo } from "react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { motion } from "framer-motion";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

export const ProjectItems = ({ items }) => {
  const rotations = useMemo(
    () => items.map(() => (Math.random() * 10 - 5).toFixed(2)),
    [items]
  );

  return (
    <div className="projects" id="projecten">
      {items.map((item, i) => {
        return(
          <motion.div
            key={`img${i}`}
            style={{
              rotate: Number(rotations[i]),
            }}
            initial={{
              y: 100,
            }}
            whileInView={{
              y: 0,
              transition: { duration: 1, ease: "easeIn"},
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="imgContainer"
          >
            <Link href={`/project/${item.uid}`}>
              <PrismicNextImage field={item.data.preview_image} />
              <PrismicRichText field={item.data.title}/>
            </Link>
          </motion.div>
        )
      })}
    </div>
  );
};