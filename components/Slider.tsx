"use client";

import { foodSliderData } from "@/data";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Slider = () => {
  const [width, setWidth] = useState<number>(0);
  const carousel = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [width]);
  return (
    <motion.div ref={carousel} className="food__slider">
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="food__slider__wrapper"
      >
        {foodSliderData.map((slide, i) => (
          <motion.div key={i} className="item">
            <div className="item__image">
              <Image alt="" src={slide.image} fill />
            </div>
            <div className="item__content">
              <h3>Lobster Thermidor</h3>
              <p>Lorem ipsum dolor</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* <p>drag to interact</p> */}
    </motion.div>
  );
};

export default Slider;
