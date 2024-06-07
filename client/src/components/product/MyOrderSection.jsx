import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changeType } from '@/store/board';
import { fetchOrder } from '@/store/product';
import { formatCurrency } from '@/components/product/utils';

const MyOrderSectionBlock = styled.div`

`;

const SlideWrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const SlideItem = styled.div`
h3 {
  text-align: center;
  font-size: 20px;
  font-weight: 100;
}
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
    .content {
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .orderNo {
        background: #0059e9;
        color: #fff;
        border-radius: 5px;
        padding: 10px;
        font-weight: 600;
      }
      .content_part {
        background: #fafafa;
        padding: 10px;
        border-radius: 5px;
        font-weight: 600;
        color: #777777;
        display: flex;
        flex-direction: column;
        gap: 5px;
        span{
        font-weight: 200;
        color: #000;
        }
        .homeType {
          span {
            color: #0059e9;
            font-weight: 200;
          }
        }
      }
      .review {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
`;

const MyOrderSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(state => state.products.orders);
  console.log(orders)
  const groupedOrders = orders.reduce((acc, order) => {
    const orderDate = new Date(order.orderDate).toLocaleString();
    if (!acc[orderDate]) {
      acc[orderDate] = [];
    }
    acc[orderDate].push(order);
    return acc;
  }, {});

  const user = useSelector(state => state.members.user);
  const review = useSelector(state => state.boards.review);

  const [userCompleteReview, setUserCompleteReview] = useState([]);
  useEffect(() => {
    if (user) {
      setUserCompleteReview(review.filter(item => item.writer === user.userId));
      dispatch(fetchOrder(user.userNo));
    }
  }, [dispatch, user.userNo]);

  const handleReviewClick = (orderItem) => {
    dispatch(changeType("review"));
    navigate("/boardWrite", { state: { orderItem } });
  }

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <MyOrderSectionBlock>
      {user ? (
        Object.keys(groupedOrders).length ? (
          <SlideWrapper>
            <Slider {...sliderSettings}>
              {Object.keys(groupedOrders).map((orderDate, index) => (
                <SlideItem key={index}>
                  <h3>{orderDate}</h3>
                  {groupedOrders[orderDate].map((item, ind) => {
                    const isReviewed = userCompleteReview.some((userReview) => userReview.orderNo === item.orderNo);
                    return (
                      <div key={ind} className='content'>
                          <div className='orderNo'>예약 번호: {item.orderNo}</div>
                        <div className='content_part'>
                          <div className='homeType'><span>{item.homeType}</span><span>{item.productType}</span></div>
                          <div className='name'>예약자: <span>{item.name}</span></div>
                          <div className='addr'>주소: <span>{item.addr1} {item.addr2}</span></div>
                          <div className='cost'>기본금액: <span>{formatCurrency(item.price)}원</span></div>
                        </div>
                        <div className='review'>
                          {isReviewed ? (
                            <span style={{ background: '#eee' }}>작업완료</span>
                          ) : (
                            <span
                              style={{ background: '#0059e9', cursor: 'pointer', color: '#fff', padding: '10px', borderRadius: '5px', fontSize: '10px' }}
                              onClick={() => { handleReviewClick(item) }}
                            >
                              작업 미완료
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </SlideItem>
              ))}
            </Slider>
          </SlideWrapper>
        ) : (
          <div style={{ textAlign: 'center', fontSize: '20px' }}>
            주문하신 상품이 없습니다.
          </div>
        )
      ) : (
        <div style={{ textAlign: 'center' }}>
          로그인하면 확인하실 수 있습니다. <br /><br /><br />
          <Link to="/login" style={{ padding: '10px', background: '#ddd' }}>로그인</Link>
        </div>
      )}
    </MyOrderSectionBlock>
  );
};

export default MyOrderSection;