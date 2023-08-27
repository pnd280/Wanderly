import './App.scss';

import Header from './layouts/Header';
import About from './layouts/About';
import Features from './layouts/Features';
import Tours from './layouts/Tours';
import Testimonials from './layouts/Testimonials';
import Footer from './layouts/Footer';
import Book from './layouts/Book';

function App() {
  return (
    <>  
      <Header/>
      <About/>
      <Features/>
      <Tours/>
      <Book/>
      <Testimonials/>
      <Footer/>
    </>
  );
}

export default App;
