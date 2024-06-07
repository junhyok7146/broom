import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from '@/store/product';
import { Link } from 'react-router-dom';

const ReservationSectionBlock = styled.div`
  padding-top: 50px;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    margin: 20px 0;
    font-size: 24px;
    text-align: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 50px;

    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    th {
      text-align: left;
      font-weight: bold;
    }

    img {
      width: 100px;
      height: auto;
      margin-right: 10px;
    }
  }

  .no-order {
    text-align: center;
    font-size: 18px;
    margin-top: 50px;
  }

  .login-message {
    text-align: center;
    margin-top: 50px;

    a {
      padding: 10px;
      background: #ddd;
      text-decoration: none;
    }
  }
`;

const ReservationSection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.members.user);
  const customer = useSelector((state) => state.products.customer);

  useEffect(() => {
    if (user) {
      dispatch(fetchCustomer(user.userNo));
    }
  }, [dispatch, user]);

  const groupedOrders = customer.reduce((acc, order) => {
    const orderDate = new Date(order.orderDate).toLocaleString();
    if (!acc[orderDate]) {
      acc[orderDate] = [];
    }
    acc[orderDate].push(order);
    return acc;
  }, {});

  return (
    <ReservationSectionBlock>
      {user ? (
        Object.keys(groupedOrders).length ? (
          <table>
            <thead>
              <tr>
                <th>주문일자</th>
                <th>주문상품</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedOrders).map((orderDate, index) => (
                <tr key={index}>
                  <td>{orderDate}</td>
                  <td>
                    {groupedOrders[orderDate].map((item, ind) => (
                      <div key={ind}>
                        <img src={`http://localhost:8001/uploads/${item.photo}`} alt={item.name} />
                        <span>상품명: {item.name}</span> /{' '}
                        <span>수량: {item.qty}개</span> /{' '}
                        <span>금액: {parseInt(item.qty) * parseInt(item.price)}원</span>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-order">주문하신 상품이 없습니다.</div>
        )
      ) : (
        <div className="login-message">
          로그인하면 확인하실 수 있습니다.
          <br />
          <Link to="/login">로그인</Link>
        </div>
      )}
    </ReservationSectionBlock>
  );
};

export default ReservationSection;