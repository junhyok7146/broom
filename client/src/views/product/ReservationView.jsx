import React from 'react';
import ReservationSection from '@/components/product/ReservationSection';
import FindLocation from '@/components/layout/FindLocation'

const ReservationView = () => {
    return (
        <div className="row"style={{margin:'50px auto'}}>
            <FindLocation/>
            <ReservationSection />
        </div>
    );
};

export default ReservationView;