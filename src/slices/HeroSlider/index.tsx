'use client';
import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Slider from "react-slick";
import styles from "./index.module.scss";
import { isFilled } from "@prismicio/client";

export type HeroSliderProps = SliceComponentProps<Content.HeroSliderSlice>;

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className={styles.nextArrow} onClick={onClick}>
    <img src="/SVG/right-arrow.svg"/>
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className={styles.prevArrow} onClick={onClick}>
    <img src="/SVG/left-arrow.svg"/>
  </div>
);

const HeroSlider: FC<HeroSliderProps> = ({ slice }) => {
  const slides = slice?.primary.items || [];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    fade: true,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.slider}
    >
      <Slider {...settings}>
        {slides.map((item, i) => {
          if (!isFilled.linkToMedia(item.media)) return null;

          const { url, kind } = item.media;

          return (
            <div key={i} className={styles.slide}>
              {kind === "file" ? (
                <video
                  className={styles.video}
                  src={url}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  className={styles.image}
                  src={url}
                  alt={item.media.name || ""}
                />
              )}
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default HeroSlider;
