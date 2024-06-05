import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from '@/store/product';
import { Link } from 'react-router-dom';

const ReservationSectionBlock = styled.div`
  padding-top: 300px;
  h2 {
    margin: 20px 0;
  }
  table {
    margin-bottom: 50px;
  }
  table.orderList {
    col:nth-child(1) {
      width: 200px;
    }
    col:nth-child(2) {
      width: auto;
    }
    thead {
      th {
        padding: 10px;
      }
    }
    tbody {
      td {
        padding: 10px;
      }
    }
  }
`;

const ReservationSection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.members.user);
  const customer = useSelector((state) => state.products.customer);
  console.log(customer);
  console.log(user.userNo);

  useEffect(() => {
    dispatch(fetchCustomer(user.userNo))
  }, [dispatch, user.userNo]);

  const groupedOrders = customer.reduce((acc, order) => {
    const orderDate = new Date(order.orderDate).toLocaleString(); // 날짜 형식을 원하는 형태로 변환
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
  <table className="orderList" border="1">
    <colgroup>
      <col />
      <col />
    </colgroup>
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
            {groupedOrders[orderDate].map((item, ind) => {
              return (
                <div
                  key={ind}
                  style={{
                    borderBottom: '1px solid #ddd',
                    position: 'relative',
                  }}
                >
                  <span>
                    <img src={`http://localhost:8001/uploads/${item.photo}`} alt={item.name} />
                  </span>
                  <span>상품명 : {item.name} </span> /{' '}
                  <span>수량 : {item.qty}개 </span> /{' '}
                  <span>
                    금액 : {parseInt(item.qty) * parseInt(item.price)}원{' '}
                  </span>
                </div>
              );
            })}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <div style={{ textAlign: 'center', fontSize: '30px' }}>
    주문하신 상품이 없습니다.
  </div>
)
) : (
<div style={{ textAlign: 'center' }}>
  로그인하면 확인하실 수 있습니다. <br />
  <br />
  <br />
  <Link to="/login" style={{ padding: '10px', background: '#ddd' }}>
    로그인
  </Link>
</div>
)}
</ReservationSectionBlock>
);
};

export default ReservationSection;