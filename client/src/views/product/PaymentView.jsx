import React from 'react';
import PaymentSection from '@/components/product/PaymentSection'
import {useLocation} from 'react-router-dom'

const PaymentView = () => {
 
    const location = useLocation()
    const { product, path } = location.state
    console.log(product)
    return (
        <div className="row">
            <h2 style={{ fontSize:'20px', textAlign:'center', padding:'100px 0 10px', display:'flex', alignItems:'center', justifyContent:'center'}}>주문결제</h2>
            <PaymentSection product={product} path={path}/>
        </div>
    );
};

export default PaymentView;