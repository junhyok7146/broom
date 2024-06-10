import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchCart } from '@/store/product';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos"
import 'aos/dist/aos.css' ;


const CartSectionBlock = styled.div`
  max-width: 500px;
  margin: 0 auto;
  height: 500px;
  padding-top: 50px;

  .title {
    color: #0059e9;
    font-weight: 600;
  }

  ul.slick-dots {
    top: -40px;
    bottom: auto;
  }
`;

const CardItemBlock = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 12px;
  padding: 30px 30px;
  margin-bottom: 20px;

  .card-item-row {
    display: flex;
    margin-bottom: 10px;
    gap: 20px;

    .item-label {
      font-weight: 600;
      text-align: center;
    }
  }

  .item-actions {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 40px;
    button {
      flex: 1;
      padding: 10px;
      background: #0059e9;
      color: #fff;
      border-radius: 5px;
    }
      button:nth-child(1) {
        background:#fff;
        border: 1px solid #0059e9;
        color: #0059e9;
      }
  }
`;

const CartSection = () => {
  useEffect(() => {
    AOS.init({
    duration: 1000,
    });
  }, []);
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
      <Slider {...settings}>
        {carts && carts.length ? 
          carts.map((item, index) => (
            <div key={index}>
              <CardItemBlock style={{display:'flex', flexDirection:'column', gap:'20px', margin:'20px'}}  data-aos='fade-up'>
                <div className='title' style={{textAlign:'left', fontSize:'20px'}}>예약번호 <span>{item.prNo}</span></div>
                <div className='content' style={{padding:'0 20px', fontSize:'13px'}}>
                  <div className="card-item-row">
                    <span className="item-label" style={{width:'70px'}}>예약자 성함</span>
                    <span>{item.name}</span>
                  </div>
                  <div className="card-item-row">
                    <span className="item-label" style={{width:'70px'}}>시간대</span>
                    <span>{item.category}</span>
                  </div>
                  <div className="card-item-row">
                    <span className="item-label" style={{width:'70px'}}>우편번호</span>
                    <span>{item.zipCode}</span>
                  </div>
                  <div className="card-item-row">
                    <span className="item-label" style={{width:'70px'}}>주소</span>
                    <span>{item.addr1} {item.addr2}</span>
                  </div>
                  <div className="card-item-row">
                    <span className="item-label" style={{width:'70px'}}>집구조</span>
                    <span>{item.homeType}</span>
                  </div>
                  <div className="card-item-row">
                    <span className="item-label" style={{width:'70px'}}>신청타입</span>
                    <span>{item.productType}</span>
                  </div>
                  <div className="card-item-row">
                    <span className="item-label" style={{width:'70px'}}>가격</span>
                    <span>{(parseInt(item.price) * parseInt(item.qty)).toLocaleString()}원</span>
                  </div>
                  <div className="item-actions">
                    <button type="button" onClick={() => removeCartItem(item.cartNo)}><Link to='/product'>예약취소</Link></button>
                    <button type="button" onClick={() => buyItem(item)}>예약 확정하기</button>
                  </div>
                </div>
              </CardItemBlock>
            </div>
          ))
        :
        <div style={{ textAlign: 'center', height:'600px' , display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <div style={{width: '100%', display:'flex', flexDirection:'column', gap: '20px'}}>
          <div style={{fontSize: '20px', margin:'0 auto'}}>
            선택한 예약이 없습니다.
          </div>
          <Link to="/product" style={{ padding: '10px', background: '#0059e9', color: '#fff', borderRadius:'5px',width:'100px', textAlign:'center', margin:'0 auto' }}>돌아가기</Link>
        </div>
      </div>
        }
      </Slider>
    </CartSectionBlock>
  );
};

export default CartSection; 