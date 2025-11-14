import React from 'react';
import Header from '../components/Home/Header';
import HeroSection from '../components/Home/HeroSection';
import FeaturedCompanies from '../components/Home/FeaturedCompanies';
import FeaturesSection from '../components/Home/FeaturesSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import CTASection from '../components/Home/CTASection';
import Footer from '../components/Home/Footer';

function HomePage() {
  return (
    <div className="bg-white">
      <Header />
      <HeroSection />
      <FeaturedCompanies />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default HomePage;
