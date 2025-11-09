import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";

export type EmbedProps = SliceComponentProps<Content.EmbedSlice>;

const Embed: FC<EmbedProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.embed}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: slice.primary.embed?.html ?? "",
        }}
      />
      {slice.primary.caption && (
        <PrismicRichText field={slice.primary.caption} />
      )}
    </section>
  );
};

export default Embed;
