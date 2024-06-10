import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from '@/store/product';
import { Link } from 'react-router-dom';
import AOS from "aos"
import 'aos/dist/aos.css' ;

const ReservationSectionBlock = styled.div`
padding: 20px;
.main {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.content {
  background: #fff;
  border-radius: 12px;
  padding: 8px 24px 16px 24px;
  display: flex;
  font-size: 15px;
  flex-direction: column;
  .title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    font-weight: 600;
    padding: 5px 0;
    button {
      background: #e4efff;
      color: #0059e9;
      padding: 4px 12px;
      border-radius: 8px;
    }
  }
    .list{
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
      .cate{
      display: flex;
          .min_title{
            width: 70px;
            color: #999;
          }
        }
    }
}
`;

const ReservationSection = () => {
  useEffect(() => {
    AOS.init({
    duration: 1000,
    });
  }, []);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.members.user);
  const customer = useSelector((state) => state.products.customer);
  console.log(customer)
  useEffect(() => {
    if (user) {
      dispatch(fetchCustomer(user.userNo));
    }
  }, [dispatch, user]);
  return (
    <ReservationSectionBlock>
      {user ? (
        customer.length > 0 ? (
          <div className='main'>
            {customer.map((item, index) => (
              <div className='content' key={index} data-aos="fade-left">
                  <div className='title'>
                    <div>예약번호 {item.prNo}</div>
                    <div><button>미완료</button></div>
                  </div>
                  <div className='list'>
                    <div className='cate'>
                      <div className='min_title'>예약 일자</div>
                      <div>{new Date(item.orderDate).toLocaleDateString()}</div>
                    </div>
                    <div className='cate'>
                      <div className='min_title'>집 구조</div>
                      <div>{item.homeType}</div>
                    </div>
                    <div className='cate'>
                      <div className='min_title'>신청타입</div>
                      <div>{item.productType}</div>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{height:'600px', display:'flex', justifyContent:'center',alignItems:'center', flexDirection:'column'}}>
            <div style={{display:'flex', justifyContent:'center',alignItems:'center', flexDirection:'column', gap: '30px'}}>
              <div className="no-order" style={{fontSize: '20px'}}>확정된 예약이 없습니다.</div>
              <Link to="/" style={{display: 'flex', justifyContent:'center', background: '#0059e9', color: '#fff', borderRadius:'5px', padding:'5px 10px'}}>돌아가기</Link>
            </div>
          </div>
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