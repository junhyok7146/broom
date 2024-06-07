import React from 'react';
import styled from 'styled-components'
import FindLocation from '@/components/layout/FindLocation'
import MyOrderSection from '@/components/product/MyOrderSection'

const MyOrderViewBlock = styled.div`
max-width:900px; margin:50px auto;
`

const MyOrderView = () => {
    return (
        <MyOrderViewBlock className="row">
            <FindLocation />
            <MyOrderSection />
        </MyOrderViewBlock>
    );
};

export default MyOrderView;