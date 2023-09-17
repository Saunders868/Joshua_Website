import Image from "next/image";

const Hero = () => {
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

      <div className="home__section__content">
        <div className="pill">
          <p>Taste Trinidad&apos;s Treasures</p>
        </div>

        <div className="home__section__content__title">
          <h1>Joshua Greene</h1>
        </div>

        <div className="home__section__content__text">
          <h2>
            Trinidad&apos;s Taste Sensation: Our Chef&apos;s Creations Elevate
            Island Cooking to a Whole New Level - Discover the Art of Caribbean
            Flavor with Every Bite!
          </h2>
        </div>
      </div>

      <div className="home__section__wave">
        <Image src="/Wave.png" alt="wave" fill />
      </div>
    </>
  );
};

export default Hero;
