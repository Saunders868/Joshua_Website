import Slider from "@/components/Slider";
import Hero from "@/sections/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="home__section">
        <Hero />
      </section>
      <section className="info__section">
        <div className="info__section__content">
          <h2>The Best Restaurant Food in Town</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
        </div>

        <div className="info__section__images">
          <div className="info__section__images__large">
            <Image
              fill
              alt=""
              src="https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            />
          </div>

          <div className="info__section__images__small">
            <div>
              <Image
                fill
                alt=""
                src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
              />
            </div>
            <div>
              <Image
                fill
                alt=""
                src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="products__section">
        <div className="products__section__content">
          <h2>The Perfect Place to Enjoy a Delicious Meal</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
        </div>

        <div className="slider">
          <Slider />
        </div>
      </div>
    </main>
  );
}
