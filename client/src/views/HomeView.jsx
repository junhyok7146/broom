import React from 'react';
import styled from 'styled-components'
import SliderSection from '@/components/home/SliderSection'
import ReviewMainSection from '@/components/home/ReviewMainSection';
import ExampleSection from '../components/home/ExampleSection';


const HomeViewBlock = styled.div``

const HomeView = () => {
    return (
        <HomeViewBlock>
            <SliderSection />
            <ReviewMainSection />
            <ExampleSection />
        </HomeViewBlock>
    );
};

export default HomeView;