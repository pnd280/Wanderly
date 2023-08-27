import './Book.scss';

const Book = () => {
  return (
    <div className="section-book">
      <h2 className="heading-secondary">Start your adventure!</h2>
      <div className="section-book__form">
        <div className="form__group-personal-info">
          <div className="heading-tertiary">How do we contact you?</div>
          <input type="text" placeholder="Your full name" />
          <input type="email" placeholder="Email address" />
          <input type="text" placeholder="Phone number" />
          <div type="button" className="btn">
            Next step 👉🏻
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
