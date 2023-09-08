import '@styles/App.scss';

import { useEffect } from 'react';

import { AppContextProvider } from '@/context/AppContext';
import Header from '@/layouts/Header.jsx';
import Merchs from '@/layouts/Merchs';
import Tours from '@/layouts/Tours';
import About from '@layouts/About';
import Book from '@layouts/Book';
import Features from '@layouts/Features';
import Footer from '@layouts/Footer';
import Testimonials from '@layouts/Testimonials';

import CartContextProvider from './components/CartContextProvider';

const App = () => {
  useEffect(() => {
    const loadingSpinner = document.querySelector('.loading-screen');

    if (loadingSpinner) {
      loadingSpinner.style.display = 'none';
    }
  }, []);

  return (
    <AppContextProvider>
      <Header />
      <About />
      <Features />
      <Tours />
      <Book />
      <Testimonials />
      <CartContextProvider>
        <Merchs />
      </CartContextProvider>
      <Footer />
    </AppContextProvider>
  );
};

export default App;
