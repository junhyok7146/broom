import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SliderSection from '@/components/home/SliderSection';
//import ReviewMainSection from '@/components/home/ReviewMainSection';
import ExampleSection from '@/components/home/ExampleSection';
import Header from '@/components/layout/Header';
import VideoSection from '@/components/home/VideoSection';
import BroomSection from '@/components/home/BroomSection';


const HomeViewBlock = styled.div``;

const HomeView = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const sliderRef = useRef(null);

  const handleScroll = () => {
    const sliderHeight = sliderRef.current.offsetHeight;
    if (window.scrollY > sliderHeight) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HomeViewBlock>
      <Header isScrolled={isScrolled} />
      <div ref={sliderRef}>
        <SliderSection />
      </div>
      {/* <ReviewMainSection /> */}
      <ExampleSection />
      <VideoSection />
      <BroomSection />
    </HomeViewBlock>
  );
};

export default HomeView;