"use client";
import { useEffect, useRef, useState } from "react";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  type SliceComponentProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import { type Content } from "@prismicio/client";
import styles from "./index.module.scss";

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => (
    <PrismicNextLink field={node.data}>{children}</PrismicNextLink>
  ),
  label: ({ node, children }) => {
    if (node.data.label === "codespan") return <code>{children}</code>;
  },
};

type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

const RichText = ({ slice }: RichTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
  const el = ref.current;
  const sentinel = sentinelRef.current;
  if (!el || !sentinel) return;

  const allSlices = Array.from(
    document.querySelectorAll("[data-richtext], .collapsible")
  );

  const currentIndex = allSlices.indexOf(el);
  const nextSlice = allSlices[currentIndex + 1] as HTMLElement | undefined;
  if (!nextSlice) return;

  let hasPassed = false;

  // fade OUT when next slice crosses threshold
  const nextObserver = new IntersectionObserver(
    ([entry]) => {
      if (!hasPassed && entry.intersectionRatio > 0.4) {
        setFadeOut(true);
      }

      // lock
      if (entry.boundingClientRect.bottom < 0) {
        hasPassed = true;
      }
    },
    {
      threshold: [0.4],
      rootMargin: "0px 0px -30% 0px",
    }
  );

  // fade IN when scrolling up into the sentinel zone (much easier to detect)
  const sentinelObserver = new IntersectionObserver(
    ([entry]) => {
      if (!hasPassed && entry.isIntersecting) {
        setFadeOut(false);
      }
    },
    {
      rootMargin: "0px 0px -10% 0px", // fade-in earlier
      threshold: 0,
    }
  );

  nextObserver.observe(nextSlice);
  sentinelObserver.observe(sentinel);

  return () => {
    nextObserver.disconnect();
    sentinelObserver.disconnect();
  };
}, []);



  return (
    <>
    <div ref={sentinelRef} style={{ height: "1px" }} />
    <section
      ref={ref}
      data-richtext
      className={`${styles.richtext} ${fadeOut ? styles.fadeOut : ""}`}
    >
      <PrismicRichText field={slice.primary.content} components={components} />
    </section>
    </>
  );
};

export default RichText;
