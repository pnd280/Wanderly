import { useState } from 'react';

import ImageContainer from '../components/ImageContainer';
import './About.scss';
import { useEffect } from 'react';

const About = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const images = [
      {
        src: './wanderly-mockup.png',
        alt: 'about-us-1',
        className: 'section-about__img-1',
      },
      {
        src: './about-2.jpg',
        alt: 'about-us-2',
        className: 'section-about__img-2',
      },
      {
        src: './about-3.jpg',
        alt: 'about-us-3',
        className: 'section-about__img-3',
      },
      {
        src: './about-1.jpg',
        alt: 'mockup',
        className: 'section-about__img-4',
      },
    ];

    setImages(images);
  }, []);

  return (
    <section className="section-about">
      <h2 className="heading-secondary">
        Foundation
      </h2>
      <div>
        <div className="section-about__text-content">
          <div>
            <h3 className="heading-tertiary">Our Story</h3>
            <p>
              Wanderly was founded in 2020 by a group of passionate travelers
              who wanted to create unforgettable experiences for fellow
              adventurers. Our team has explored the world&apos;s most stunning
              destinations, and we&apos;re excited to share our knowledge and
              expertise with you.
            </p>
          </div>
          <div>
            <h3 className="heading-tertiary">Our Mission</h3>
            <p>
              At Wanderly, our mission is to provide unique, personalized travel
              experiences that cater to your interests and preferences. We
              believe that travel is more than just visiting new
              places—it&apos;s about creating lasting memories and connections
              with the people and cultures you encounter.
            </p>
          </div>
          <a href="#" className="btn-text">
            Learn more &rarr;
          </a>
        </div>
        <div className="section-about__img-gallery">
          {images.map((image, key) => {
            return (
              <ImageContainer
                key={key}
                src={image.src}
                alt={image.src}
                className={`section-about__img-${key + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
