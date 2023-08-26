
import "./Hero.scss"

const Hero = () => {
  return (
    <section className="section-hero">
      <div className="section-hero__container">
        <h1 className="section-hero__title">Wanderly</h1>
        <p className="section-hero__subtitle">
          Outdoors is where life happens
        </p>
        <a href="#" className="section-hero__cta-button">
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
