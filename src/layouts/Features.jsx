import '@styles/Features.scss';

import {
  IoCompassOutline,
  IoExtensionPuzzleOutline,
  IoLeafOutline,
} from 'react-icons/io5';
import { LuHotel } from 'react-icons/lu';

import FeatureBox from '@components/FeatureBox';

const Features = () => {
  const features = [
    {
      icon: <IoExtensionPuzzleOutline />,
      title: 'Tailored experiences',
      description:
        'We customize each tour to fit your preferences, ensuring a truly unique and memorable adventure.',
    },
    {
      icon: <IoCompassOutline />,
      title: 'Expert guides',
      description:
        'Our knowledgeable and friendly guides are passionate about sharing their local insights and expertise with you.',
    },
    {
      icon: <LuHotel />,
      title: 'Quality accommodations',
      description:
        'We carefully select comfortable and charming accommodations that reflect the local culture and environment.',
    },
    {
      icon: <IoLeafOutline />,
      title: 'Sustainable travel',
      description:
        'We prioritize eco-friendly practices and support local communities to promote responsible and sustainable tourism.',
    },
  ];

  return (
    <section className="section-features">
      <div className="section-features__feature-container">
        {features.map((feature, index) => {
          return (
            <FeatureBox
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Features;
