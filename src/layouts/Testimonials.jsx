import TestimonialBox from '../components/TestimonialBox';

import './Testimonials.scss';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah J.',
      img_src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      summary: 'Top travel with Wanderly',
      quote:
        "Wanderly provided the most amazing travel experience I've ever had. The guides were knowledgeable and friendly, and the accommodations were top-notch.",
    },
    {
      name: 'John D.',
      img_src: 'https://i.pravatar.cc/150?u=2',
      summary: 'Great experience',
      quote:
        "I've been on several tours with Wanderly, and I've never been disappointed. I will definitely be a repeat customer.",
    },
    {
      name: 'Jane S.',
      img_src: 'https://i.pravatar.cc/150?u=88888888',
      summary: 'A trip to remember',
      quote:
        'I took my family on a tour with Wanderly, and we all had a great time. The kids loved it, and my husband and I were able to relax knowing that everything was taken care of.',
    },
  ];

  return (
    <section className="section-testimonials">
      <h2 className="section-testimonials__heading heading-secondary" id="stories">
        We bring people happiness
      </h2>
      <div className="section-testimonials__testimonial-container">
        {testimonials.map((testimonial, key) => {
          return <TestimonialBox testimonial={testimonial} key={key} />;
        })}
        <div className="cta-text-claim">satisfaction guaranteed by <span className="u-text-highlight">4321+</span> groups & individuals 👏🏻</div>
      </div>
    </section>
  );
};

export default Testimonials;
