import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changeType } from '@/store/board';
import { fetchOrder } from '@/store/product';

const MyOrderSectionBlock = styled.div`
  padding-top: 100px;
  h2 {
    margin: 20px 0;
  }
  table {
    width: 100%;
    margin-bottom: 50px;
    border-collapse: collapse;
    font-size: 16px;
  }
  table.orderList {
    col:nth-child(1) {
      width: 200px;
    }
    col:nth-child(2) {
      width: auto;
    }
    thead {
      background-color: #f8f9fa;
      th {
        padding: 10px;
        border-bottom: 1px solid #dee2e6;
      }
    }
    tbody {
      td {
        padding: 10px;
        border-bottom: 1px solid #dee2e6;
      }
      tr:last-child td {
        border-bottom: none;
      }
    }
  }
`;

const MyOrderSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(state => state.products.orders);

  const groupedOrders = orders.reduce((acc, order) => {
    const orderDate = new Date(order.orderDate).toLocaleDateString() + ' ' + new Date(order.orderDate).toLocaleTimeString(); // 날짜 형식을 원하는 형태로 변환
    if (!acc[orderDate]) {
      acc[orderDate] = [];
    }
    acc[orderDate].push(order);
    return acc;
  }, {});

  const user = useSelector(state => state.members.user);
  const review = useSelector(state => state.boards.review);

  const [userCompleteReview, setUserCompleteReview] = useState([]);
  console.log(orders);

  useEffect(() => {
    if (user) {
      setUserCompleteReview(review.filter(item => item.writer === user.userId));
      dispatch(fetchOrder(user.userNo));
    }
  }, [dispatch, user?.userNo]);

  const handleReviewClick = (orderItem) => {
    dispatch(changeType("review"));
    navigate("/boardWrite", { state: { orderItem } });
  };

  return (
    <MyOrderSectionBlock>
      {user ? (
        Object.keys(groupedOrders).length ? (
          <table className="orderList">
            <colgroup>
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>예약확정 내역</th>
                <th>고객 정보</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedOrders).map((orderDate, index) => (
                <tr key={index}>
                  <td>{orderDate}</td>
                  <td>
                    {groupedOrders[orderDate].map((item, ind) => {
                      const isReviewed = userCompleteReview.some((userReview) => userReview.orderNo === item.orderNo);
                      return (
                        <div
                          key={ind}
                          style={{
                            borderBottom: '1px solid #dee2e6',
                            padding: '10px 0',
                            position: 'relative',
                          }}
                        >
                          <span>상품명 : {item.name} </span> /{' '}
                          <span>수량 : {item.qty}개 </span> /{' '}
                          <span>
                            금액 : {parseInt(item.qty) * parseInt(item.price)}원{' '}
                          </span>
                          {isReviewed ? (
                            <span
                              style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                padding: '5px',
                                background: '#0059e9',
                                borderRadius: '4px',
                                color:'#fff',
                              }}
                            >
                              리뷰완료
                            </span>
                          ) : (
                            <span
                              style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                padding: '5px',
                                background: '#0059e9',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                color:'#fff',
                              }}
                              onClick={() => { handleReviewClick(item); }}
                            >
                              리뷰쓰기
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', fontSize: '20px' }}>
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
    </MyOrderSectionBlock>
  );
};

export default MyOrderSection;