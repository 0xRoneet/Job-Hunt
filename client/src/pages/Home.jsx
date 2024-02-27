import React from 'react';
import HeroSection from '../components/HeroSection';
import FindJobsGlimpse from '../components/FindJobsGlimpse';
import Testimonials from '../components/Testimonials';
import ContactUs from '../components/ContactUs';
import Timeline from '../components/timeline';
import Testimonials2 from '../components/Testimonials2';
import '../index.css';

const Home = () => {
  return (
    <div className=' overflow-hidden'>
      <HeroSection />
      <Testimonials />
      <Timeline />
      <Testimonials2 />
      <FindJobsGlimpse />
      <ContactUs />
    </div>
  );
};

export default Home;
