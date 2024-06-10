import React from 'react';
import ReservationSection from '@/components/product/ReservationSection';
import FindLocation from '@/components/layout/FindLocation'

const ReservationView = () => {
    return (
        <div style={{margin:'0 auto', maxWidth:'500px', paddingTop:'60px', background:'#f1f1f1'}}>
            <FindLocation/>
            <ReservationSection />
        </div>
    );
};

export default ReservationView;