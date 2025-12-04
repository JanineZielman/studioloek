"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import styles from "./index.module.scss";

/**
 * Props for `ImageLinks`.
 */
export type ImageLinksProps = SliceComponentProps<Content.ImageLinksSlice>;

/**
 * Component for "ImageLinks" Slices.
 */
const ImageLinks: FC<ImageLinksProps> = ({ slice }) => {
  const count = slice.primary.imagelinks.length;
  const imageWidth =
    count <= 1
      ? "70%"
      : count === 2
        ? "40%"
        : count === 3
          ? "30%"
          : "30%";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${styles.images} imagesWrapper`}
    >
      <div className={styles.imgWrapper}>
        {slice.primary.imagelinks.map((item, i) => (
          <motion.div
            key={`img${i}`}
            style={{
              width: imageWidth,
              // rotate: Number(rotations[i]),
            }}
            initial={{
              y: 100,
            }}
            whileInView={{
              y: 0,
              transition: { duration: 1, ease: "easeIn" },
            }}
            viewport={{ once: false, amount: 0.3 }}
            className={styles.imgContainer}
          >
            <PrismicNextImage field={item.image} />
            <div className={styles.text}>
              <PrismicRichText field={item.text} />
              <div className={styles.link}>
                <PrismicNextLink field={item.link} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ImageLinks;
