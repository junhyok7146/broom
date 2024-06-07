import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchCart, fetchOrder, fetchProduct } from '@/store/product';
import styled from 'styled-components';
import finish from '@/assets/image/0de41a3c5953fba1755ebd416ec109dd.gif';

const PaymentFinishSectionBlock = styled.div`
  padding-top: 150px;
  text-align: center;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
  }

  a {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const PaymentFinishSection = ({ product, path }) => {
  console.log("구매구매상품", product);
  const [orderProduct, setOrderProduct] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.members.user);

  useEffect(() => {
    if (path === 'cart') {
      setOrderProduct(product);
    } else {
      setOrderProduct([{ prNo: product[0].product.prNo, qty: product[0].qty, userNo: user.userNo }]);
    }
  }, [path, product, user?.userNo]);

  useEffect(() => {
    console.log(orderProduct);
    if (orderProduct !== null) {
      axios.post("http://localhost:8001/product/order", { orderProduct })
        .then(res => {
          console.log("꼭찍", res);
          if (res.data === "성공") {
            console.log("결제, 주문추가, 장바구니삭제, 재고수정 성공");
            console.log(user.userNo);
            dispatch(fetchOrder(user.userNo));
            dispatch(fetchCart(user.userNo));
            dispatch(fetchProduct(1, 'all'));
          } else {
            console.log("결제, 주문추가, 장바구니삭제, 재고수정 실패");
          }
        })
        .catch(err => console.log(err));
    }
  }, [orderProduct, dispatch, user.userNo]);

  return (
    <PaymentFinishSectionBlock>
        <img src={finish} alt="" />
      <p>청소가 확정되었습니다.</p>
      <p>
        <Link to="/product">돌아가기</Link>
      </p>
    </PaymentFinishSectionBlock>
  );
};

export default PaymentFinishSection;