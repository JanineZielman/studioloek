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
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Find the *next* RichText section in the DOM (not just the next sibling)
    const allRichTexts = Array.from(document.querySelectorAll("[data-richtext]"));
    const currentIndex = allRichTexts.indexOf(el);
    const nextRichText = allRichTexts[currentIndex + 1] as HTMLElement | undefined;

    if (!nextRichText) return; // last one stays visible

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFadeOut(true);
        } else {
          setFadeOut(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(nextRichText);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-richtext
      className={`${styles.richtext} ${fadeOut ? styles.fadeOut : ""}`}
    >
      <PrismicRichText field={slice.primary.content} components={components} />
    </section>
  );
};

export default RichText;
