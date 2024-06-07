import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchCart } from '@/store/product';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CartSectionBlock = styled.div`
padding-top: 100px;
  .title {
    text-align: center;
    color: #0059e9;
    font-weight: 600;
  } 
`;

const TableBlock = styled.table`
  border: 1px solid #f0f3f5;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  margin: 10px;
  td, th {
    padding: 7px;
    text-align: left;
  }
  th {
    text-align: center;
  }
  th:nth-child(1) {
    width: 150px;
  }
  tbody {
    width: 100%;
    tr:nth-child(even) {
      background: #fafafa;
    }
    tr{
      width: 100%;
      td:nth-child(1){
        text-align: center;
        width: 150px;
        font-weight: 600;
      }
    }
  }
  tfoot{
    td{
      text-align: center;
      button {
        padding: 10px;
        background: #0059e9;
        color: #fff;
        border-radius: 5px;
        margin: 10px;
      }
      button:nth-child(2) {
        width: 96.59px;
      }
    }
  }
`;


const CartSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.products.carts);
  const user = useSelector((state) => state.members.user);

  const [total, setTotal] = useState(0);
  const [allCount, setAllCount] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user.userNo));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (carts.length) {
      setTotal(carts.reduce((acc, item) => acc + (parseInt(item.price) * parseInt(item.qty)), 0));
      setAllCount(carts.reduce((acc, item) => acc + parseInt(item.qty), 0));
    } else {
      setTotal(0);
      setAllCount(0);
    }
  }, [carts]);

  const removeCartItem = (cNo) => {
    if (user) {
      axios.get(`http://localhost:8001/product/cartItemRemove?cartNo=${cNo}`)
        .then((res) => {
          if (res.data.affectedRows === 1) {
            dispatch(fetchCart(user.userNo));
          }
        })
        .catch((error) => {
          console.error('삭제 중 오류 발생:', error);
        });
    }
  };

  const buyItem = (item) => {
    if (!user) {
      alert("로그인을 하십시오.");
      sessionStorage.setItem('previousUrl', '/cart');
      navigate("/login");
    } else {
      navigate("/payment", { state: { product: [item], path: 'cart' } });
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <CartSectionBlock>
        <div></div>
        <div className='title'>예약자 정보</div>
      <Slider {...settings}>
        {carts && carts.length ? 
          carts.map((item, index) => (
            <div key={index}>
              <TableBlock>
                <thead>
                  <tr>
                    <th colSpan='1'></th>
                    <th colSpan='1'></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>예약자 성함</td>
                    <td>{item.name}</td>
                  </tr>
                  <tr>
                    <td>시간대</td>
                    <td>{item.category}</td>
                  </tr>
                  <tr>
                    <td>우편번호</td>
                    <td>{item.zipCode}</td>
                  </tr>
                  <tr>
                    <td>주소</td>
                    <td>{item.addr1} {item.addr2}</td>
                  </tr>
                  <tr>
                    <td>집구조</td>
                    <td>{item.homeType}</td>
                  </tr>
                  <tr>
                    <td>신청타입</td>
                    <td>{item.productType}</td>
                  </tr>
                  <tr>
                    <td>가격</td>
                    <td>{(parseInt(item.price) * parseInt(item.qty)).toLocaleString()}원</td>
                  </tr>
                </tbody>
                <tfoot>
                  <td colSpan="2">
                    <button type="button" onClick={() => buyItem(item)}>예약 확정하기</button>
                    <button type="button" onClick={() => removeCartItem(item.cartNo)}>예약취소</button>
                  </td>
                </tfoot>
              </TableBlock>
            </div>
          ))
        :
          <div style={{ padding: '100px 0', textAlign: 'center', fontSize: '30px' }}>
            장바구니가 비어 있습니다.
          </div>
        }
      </Slider>
    </CartSectionBlock>
  );
};

export default CartSection;