import React from 'react';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import ProductApplySection from '@/components/product/ProductApplySection';
const ProductSectionBlock = styled.div``

const ProductInsert = styled.div`
    text-align:center;
    margin:50px 0;
    a { padding:10px 20px; background:#999; }
`

const ProductApply = () => {
    const user = useSelector(state=>state.members.user)
    
        return (
            <ProductSectionBlock>
                <ProductInsert>
                    {user?
                    <ProductApplySection /> :
                    <div style={{textAlign:'center'}}>
                    신청 시 로그인이 필요합니다. <br /><br /><br />
                    <Link to="/login" style={{ padding:'10px', background:'#ddd'}}>로그인</Link>
                    </div>
                    }
                </ProductInsert>
           </ProductSectionBlock>
           
        );
};
export default ProductApply;