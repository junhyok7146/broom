import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchCart } from '@/store/product';

const CartSectionBlock = styled.div`
  padding-top: 200px;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TableBlock = styled.table`
  border: 1px solid #f0f3f5;
  border-radius: 12px;
  overflow: hidden;
  max-width: 700px;
  td, th {
    padding: 7px;
    text-align: left;
  }
  th {
    color: #A6B3C1;
    text-align: center;
  }
  th:nth-child(1) {
    width:150px;
  }
  tbody {
    tr:nth-child(even) {
      background: #fafafa;
    }
    tr{
        td:nth-child(1) {
            text-align: center;
        }
    }
    td:nth-child(8) {
      button {
        background: #EBE960;
      }
    }
  }
  tfoot {
    background: #0059e9;
    color: #fff;
    tr {
      td:nth-child(1) {
        text-align: center;
      }
      td:nth-child(2) {
        text-align: right;
      }
    }
  }
`;

const Button = styled.div`
  text-align: center;
  button {
    padding: 10px;
    background: #0059e9;
    color: #fff;
    margin-top: 30px;
    border-radius: 5px;
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

  const allBuy = (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인을 하십시오.");
      sessionStorage.setItem('previousUrl', '/cart');
      navigate("/login");
    } else {
      navigate("/payment", { state: { product: carts, path: 'cart' } });
    }
  };

  return (
    <CartSectionBlock>
      <TableContainer>
        {carts && carts.length ? 
        <TableBlock>
          <thead>
            <tr>
              <th>항목</th>
              <th>내용</th>
            </tr>
          </thead>
            <tbody>
              {carts.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>예약자 성함</td>
                    <td>{item.name}</td>
                  </tr>
                  <tr>
                    <td>시간대</td>
                    <td>{item.category}</td>
                  </tr>
                  <tr>
                    <td>우편함</td>
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
                  <tr>
                    <td>
                      <button type="button" onClick={() => removeCartItem(item.cartNo)}>예약취소</button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          

          <tfoot>
            <tr>
              <td>총 주문금액</td>
              <td>{total.toLocaleString()}원</td>
            </tr>
            <tr>
              <td>주문상품수량</td>
              <td>{carts && carts.length}종 {allCount}개</td>
            </tr>
          </tfoot>
        </TableBlock> :
                    <tbody>
                    <tr>
                      <td colSpan="2" style={{ padding: '100px 0', textAlign: 'center', fontSize: '30px' }}>
                        장바구니가 비어 있습니다.
                      </td>
                    </tr>
                  </tbody>
      }
      </TableContainer>
      {carts && carts.length ?
      <Button>
        <button type="button" onClick={allBuy}>예약 확정하기</button>
      </Button>
      :
      <div></div>
      }
    </CartSectionBlock>
  );
};

export default CartSection;