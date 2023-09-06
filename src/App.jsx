import '@styles/App.scss';

import { AppContextProvider } from '@/context/AppContext';
import Header from '@/layouts/Header.jsx';
import Merchs from '@/layouts/Merchs';
import About from '@layouts/About';
import Book from '@layouts/Book';
import Features from '@layouts/Features';
import Footer from '@layouts/Footer';
import Testimonials from '@layouts/Testimonials';
import Tours from '@layouts/Tours';

const App = () => {
  return (
    <AppContextProvider>
      <Header />
      <About />
      <Features />
      <Tours />
      <Book />
      <Testimonials />
      <Merchs />
      <Footer />
    </AppContextProvider>
  );
};

export default App;
