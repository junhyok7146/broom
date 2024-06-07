import React from 'react';
import styled from 'styled-components'

const ProductCategoryBlock = styled.div`
    display: flex;
    border-bottom: 2px solid #f6f6f8;
        button {
            flex:1;
            height: 40px;
            background: none;
            color: #777777;
            font-weight: 600;
            font-size: 11px;
            &.on {
              background: #fff;
              color: #0059e9;
              border-bottom: 2px solid #0059e9;
            }
          }
`

const ProductCategory = ({changeTitle, title}) => {
    const category = ['all','오전(8시~10시)', '오후(13시~15시)', '저녁(15시~17시)', '언제든 가능']
    return (
        <ProductCategoryBlock>
            {
                category.map((item, index)=>(
                    <button key={index} type="button" onClick={()=>changeTitle(item)} className={ title==item && "on" }>{item}</button>
                ))
            }
        </ProductCategoryBlock>
    );
};

export default ProductCategory;