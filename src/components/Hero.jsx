import './Hero.scss';

const Hero = () => {
  return (
    <section className="section-hero">
      <div className="section-hero__container">
        <h1 className="section-hero__title">Wanderly</h1>
        <p className="section-hero__subtitle">Outdoors is where life happens</p>
        <a href="#tours" className="section-hero__cta-button btn">
          Discover our tours
        </a>
      </div>
    </section>
  );
};

export default Hero;
