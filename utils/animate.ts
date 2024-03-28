import gsap from "gsap";

import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export const animateWithGsapScrollTrigger = (
  target: string,
  animationProps: object,
  scrollProps?: object
) => {
  gsap.from(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 100%",
      end: "top 50%",
      ...scrollProps,
    },
  });
};

export const animateWithGsap = (target: string, animationProps: object) => {
  gsap.from(target, {
    ...animationProps,
  });
};
