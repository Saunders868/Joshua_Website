import Button from "@/components/Button";
import Image from "next/image";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joshua Greene | About Me",
};

const Page = () => {
  return (
    <main className="about__page">
      <section className="about__page__hero">
        <div className="about__page__hero__image">
          <Image
            src="https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
            fill
            loading="lazy"
          />
        </div>
        <div className="about__page__hero__content">
          <h3>Passionate</h3>
          <h1>Discover the Culinary Journey of Chef Joshua Greene</h1>
          <p>
            With a deep love for food and a commitment to excellence, Chef
            Joshua Greene brings a unique culinary experience to every dish.
            Their innovative approach and dedication to quality have earned them
            numerous accolades and recognition in the culinary world.
          </p>
          <div className="button__holder">
            <Button link="" text="Purchase Cook Book" />
          </div>
        </div>
      </section>

      <section className="about__page__creations">
        <div className="about__page__creations__title">
          <h3>Chef&apos;s</h3>
          <h2>Discover the Chef&apos;s Creations</h2>
          <p>Explore a selection of the chef&apos;s signature dishes</p>
        </div>
        <div>
          <article>
            <div>
              <Image
                src="https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                alt=""
                fill
              />
            </div>
            <div>
              <h3>Delicious Delights</h3>
              <p>
                Indulge in the flavors and the artistry of the chef&apos;s
                culinary masterpices
              </p>
              <div className="pills">
                <span>Gourment</span>
                <span>Exquisite</span>
                <span>Savory</span>
              </div>
            </div>
          </article>
          <article>
            <div>
              <Image
                src="https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                alt=""
                fill
              />
            </div>
            <div>
              <h3>Delicious Delights</h3>
              <p>
                Indulge in the flavors and the artistry of the chef&apos;s
                culinary masterpices
              </p>
              <div className="pills">
                <span>Gourment</span>
                <span>Exquisite</span>
                <span>Savory</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="about__page__test">
        <div className="about__page__test__image">
          <Image
            src="https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
            fill
          />
        </div>
        <div className="about__page__test__info">
          <div className="stars">
            <span>stars</span>
          </div>
          <div className="story">
            <p>
              As a chef, I am constantly striving to create unique and memorable
              dining experiences for my guests. It brings me great joy to see
              their faces light up with delight as they savor each bite. Cooking
              is not just a profession for me, it is my passion.
            </p>
          </div>
          <div className="name__info">
            <div>
              <h3>Joshua Greene</h3>
            </div>
            |
            <div>
              <p>Head Chef</p>
            </div>
          </div>
        </div>
      </section>

      <section>FAQ</section>
    </main>
  );
};

export default Page;
