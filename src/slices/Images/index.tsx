"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import styles from "./index.module.scss";

/**
 * Props for `Image`.
 */
export type ImageProps = SliceComponentProps<Content.ImageSlice>;

/**
 * Component for "Image" Slices.
 */
const Image: FC<ImageProps> = ({ slice }) => {
  // Random rotations between -8 and +8 degrees
  // const rotations = useMemo(
  //   () => slice.primary.images.map(() => (Math.random() * 10 - 5).toFixed(2)),
  //   [slice.primary.images]
  // );

  // Dynamic width based on number of images
  const count = slice.primary.images.length;
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
      className={styles.images}
    >
      <div className={styles.imgWrapper}>
        {slice.primary.images.map((item, i) => (
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
              transition: { duration: 1, ease: "easeIn"},
            }}
            viewport={{ once: false, amount: 0.3 }}
            className={styles.imgContainer}
          >
            <PrismicNextImage field={item.image} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Image;
