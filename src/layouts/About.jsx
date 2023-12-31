import '@styles/About.scss';

import {
  useEffect,
  useState,
} from 'react';

import ImageContainer from '@components/ImageContainer';
import ParagraphWithHeading from '@components/ParagraphWithHeading';

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
      <h2 className="heading-secondary" id="about">Our foundation</h2>
      <div>
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
        <div className="section-about__text-content">
          <div>
            <ParagraphWithHeading
              heading={{ content: 'Discovering the World with Wanderly' }}
              paragraph={{
                content:
                  "Wanderly was founded in 2020 by a group of passionate travelers who wanted to create unforgettable experiences for fellow adventurers. Our team has explored the world's most stunning destinations, and we're excited to share our knowledge and expertise with you.",
              }}
            />
          </div>
          <div>
            <ParagraphWithHeading
              heading={{
                content:
                  'Personalized Journeys for Cultural Connections & Lasting Memories',
              }}
              paragraph={{
                content:
                  "At Wanderly, our mission is to provide unique, personalized travel experiences that cater to your interests and preferences. We believe that travel is more than just visiting new places—it's about creating lasting memories and connections with the people and cultures you encounter.",
              }}
            />
          </div>
          <a href="#" className="btn-text">
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
