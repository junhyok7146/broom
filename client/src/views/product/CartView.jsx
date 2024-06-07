import React from 'react';
import styled from 'styled-components'
import CartSection from '@/components/cart/CartSection'
import FindLocation from '@/components/layout/FindLocation'

const CartViewBlock = styled.div`
    max-width:900px; margin:50px auto;
`
const CartView = () => {
    return (
        <CartViewBlock className="row">
            <FindLocation />
            <CartSection />
        </CartViewBlock>
    );
};

export default CartView;