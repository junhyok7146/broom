import React from 'react';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import FindLocation from '@/components/layout/FindLocation'
import ProductApplySection from '@/components/product/ProductApplySection';
const ProductSectionBlock = styled.div`
    margin: 0 auto;
    max-width: 500px;
`

const ProductInsert = styled.div`
    text-align:center;
    margin:0px 0;
    a { padding:10px 20px; background:#999; }
`


const ProductApply = () => {
    const user = useSelector(state=>state.members.user)
    
        return (
            <ProductSectionBlock className='row'>
                <FindLocation/>
                <ProductInsert>
                    {user?
                    <ProductApplySection /> :
                    <div style={{height: '600px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                        <div style={{display:'flex', flexDirection:'column', AlignItems:'center', gap:'10px'}}>
                            <div>로그인이 필요한 서비스입니다.</div>
                            <div><Link to="/login" style={{ padding:'10px', background:'#0059e9', color: `#fff`, borderRadius:'5px'}}>로그인</Link></div>
                        </div>
                    </div>
                    }
                </ProductInsert>
           </ProductSectionBlock>
           
        );
};
export default ProductApply;