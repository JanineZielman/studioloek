"use client";
import { FC, useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import { Content, KeyTextField, RichTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";

export type CollapsibleProps = SliceComponentProps<Content.CollapsibleSlice>;

const Collapsible: FC<CollapsibleProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${styles.section} collapsible`}
    >
      {slice.primary.collapsible?.map((item, index) => (
        <CollapsibleItem
          key={index}
          trigger={item.trigger}
          content={item.content}
        />
      ))}
    </section>
  );
};

type ItemProps = {
  trigger: KeyTextField;        // <- correct type for Key Text
  content: RichTextField;       // <- correct type for Rich Text
};

const CollapsibleItem: FC<ItemProps> = ({ trigger, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.collapsible}>
      <div className={styles.trigger} onClick={() => setOpen(!open)}>
        <h2>{trigger ?? ""}</h2><h2>{open ? '-' : '+'}</h2>
      </div>

      {open && (
        <div className={styles.content}>
          <PrismicRichText field={content} />
        </div>
      )}
    </div>
  );
};

export default Collapsible;
