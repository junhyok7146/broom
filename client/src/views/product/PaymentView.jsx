import React from 'react';
import PaymentSection from '@/components/product/PaymentSection'
import {useLocation} from 'react-router-dom'

const PaymentView = () => {
 
    const location = useLocation()
    const { product, path } = location.state
    console.log(product)
    return (
        <div className="row" style={{maxWidth:'500px', background:'#f1f1f1'}}>
            <PaymentSection product={product} path={path}/>
        </div>
    );
};

export default PaymentView;