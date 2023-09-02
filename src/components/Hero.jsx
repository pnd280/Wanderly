import '@styles/Hero.scss';

import Button from '@components/Button';

const Hero = () => {
  return (
    <section className="section-hero">
      <div className="section-hero__container">
        <h1 className="section-hero__title">Wanderly</h1>
        <p className="section-hero__subtitle">Outdoors is where life happens</p>
        <Button
          onClick={() => {
            document.querySelector('#tours').scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
          className="section-hero__cta-button"
        >
          Discover our tours
        </Button>
      </div>
    </section>
  );
};

export default Hero;
