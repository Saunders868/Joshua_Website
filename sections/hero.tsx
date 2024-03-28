"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "@/utils/animate";

const Hero = () => {
  const contentContainer = useRef(null);

  useGSAP(
    () => {
      animateWithGsap("h1", {
        opacity: 0,
        y: 200,
        duration: 1.6,
        ease: "power2.inOut",
      });
      animateWithGsap("h2 span", {
        opacity: 0,
        delay: 1,
        y: 200,
        duration: 1.6,
        ease: "power2.inOut",
      });
      animateWithGsap(".pill", {
        opacity: 0,
        delay: 1.7,
        duration: 1,
        ease: "power2.inOut",
      });
      animateWithGsap(".button__holder", {
        opacity: 0,
        delay: 1.7,
        duration: 1.7,
        ease: "power2.inOut",
      });
    },
    { scope: contentContainer }
  );
  return (
    <>
      <div className="home__section__overlay" />
      <div className="home__section__img">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
          alt="Joshua Green"
          fill
        />
      </div>

      <div ref={contentContainer} className="home__section__content">
        <div className="pill">
          <p>Taste Trinidad&apos;s Treasures</p>
        </div>

        <div className="home__section__content__title">
          <h1>Joshua Greene</h1>
        </div>

        <div className="home__section__content__text">
          <h2>
            <span>
              Trinidad&apos;s Taste Sensation: Our Chef&apos;s Creations Elevate
              Island Cooking to a Whole New Level - Discover the Art of
              Caribbean Flavor with Every Bite!
            </span>
          </h2>

          <div className="button__holder">
            <Button light link="shop" text="Purchase Cook Book" />
          </div>
        </div>
      </div>

      <div className="home__section__wave">
        <Image src="/Wave.png" alt="wave" fill />
      </div>
    </>
  );
};

export default Hero;
