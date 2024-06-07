import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initCarts } from '@/store/product';
import { userLogout, localUser } from '@/store/member';
import axios from 'axios';
import logoScrolled from '@/assets/image/logo_color.png';
import { FaBars } from "react-icons/fa6";
import { GiBroom } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import cn from 'classnames';

const HeaderBlock = styled.div`
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999999;
  ${(props) =>
    props.isHomePage && !props.isScrolled
      ? css`
          background-color: transparent;
          border: none;
        `
      : css`
          background-color: #fff;
          border-bottom: 1px solid #ddd;
        `}

  .header__logo {
    padding: 15px 45px;
    float: left;
  }

  .NAV {
    position: relative;
    display: flex;
    justify-content: flex-end;
    padding: 30px 30px 0 30px;
  }

  .depth1 {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    position: relative;
  }

  .depth1 > li {
    padding: 10px 20px;
    cursor: pointer;
    ${(props) =>
      props.isHomePage && !props.isScrolled
        ? css`
            color: #fff;
          `
        : css`
            color: #000;
          `}
    font-weight: bold;
    font-size: 19px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .depth2 {
    margin-top: 0px;
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #0059e9;
    padding: 10px 0;
    color: #fff !important;
    width: 120%; 
    font-size: 16px;
    text-align: center;
    li.member {
      display: flex;
      flex-direction: column;
    }
    a {
      display: block;
      padding: 10px 0;
    }
    depth2 > li{
      width: 100%
    }
  }

  .depth1:hover .depth2 {
    display: block;
  }

  .btn {
    background: #0059e9;
    border-radius: 50px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }

  .closeNav {
    position: fixed;
    top: 0;
    right: -999%;
    width: 700px;
    height: 100%;
    background: #0059e9;
    transition: right 0.5s ease;
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center; /* 중앙 정렬 */
    justify-content: center; /* 중앙 정렬 */
    z-index: 10000001;
    &.open {
      right: 0;
    }
  }

  .closeNavIcon {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    z-index: 10000002;
  }

  .openDepth1 {
    padding: 10px 20px;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    font-size: 40px;
    display: flex;
    flex-direction: column;
    align-items: center; /* 중앙 정렬 */
    justify-content: center; /* 중앙 정렬 */
  }

  .openDepth2 {
    display: none;
    padding: 5px;
    color: #fff;
    min-width: 200px;
    font-size: 16px;
    text-align: center;
    &.show {
      display: block;
    }
  }

  .kakao{
    margin-top:50px;
    border:3px solid skyblue;
    padding:15px 30px;
    color:#fff;
    font-size:20px;
  }
  @media (max-width: 768px) {
    .header__logo {
      padding: 20px 5px;
      float: left;
      width: 80px;
      height: auto;
    }
    .NAV {
      position: relative;
      display: flex;
      justify-content: flex-end;
      padding: 30px 30px 0 30px;
      flex-wrap: wrap;
    }
    .depth1:nth-child(1) { display: none; }
    .depth1:nth-child(2) { display: none; }
    .depth1:nth-child(3) { display: none; }
    .depth1:nth-child(4) { display: none; }

    .depth1:hover .depth2 {
      display: block;
    }
  
    .btn {
      background: #0059e9;
      border-radius: 50px;
      transition: background-color 0.3s;
  
      &:hover {
        background-color: #0056b3;
      }
    }
  
    .closeNav {
      position: fixed;
      top: 0;
      right: -999%;
      width: 100%; /* 변경된 폭 */
      height: 100%;
      background: #0059e9;
      transition: right 0.5s ease;
      display: flex;
      flex-direction: column;
      padding: 20px;
      align-items: center;
      justify-content: center; 
      z-index: 10000001;
      &.open {
        right: 0;
      }
    }
  
    .closeNavIcon {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 30px;
      color: #fff;
      cursor: pointer;
      z-index: 10000002;
    }
    .openDepth1 {
      padding: 10px 20px;
      cursor: pointer;
      color: #fff;
      font-weight: bold;
      font-size: 40px;
      display: flex;
      flex-direction: column;
      align-items: center; 
      justify-content: center; 
    }
  
    .openDepth2 {
      display: none;
      padding: 5px;
      color: #fff;
      min-width: 200px;
      font-size: 16px;
      text-align: center;
      &.show {
        display: block;
      }
    }
  }

  .overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999998;
    &.show {
      display: block;
    }
  }
`;

const Header = ({ isScrolled }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [openNav, setOpenNav] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.members.user);
  const cartsCount = useSelector((state) => state.products.cartsCount);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    dispatch(initCarts([]));
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem('loging')) {
      const { userNo } = JSON.parse(localStorage.getItem('loging'));
      axios.post("http://localhost:8001/auth/refresh", { userNo })
        .then((res) => {
          dispatch(localUser(res.data[0]));
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, cartsCount]);

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
    <HeaderBlock isHomePage={isHomePage} isScrolled={isScrolled}>
      <h1 className="header__logo">
        <Link to="/">
          {isScrolled ? (
            <img src={logoScrolled} alt="Scrolled Logo" />
          ) : (
            <img src={logoScrolled} alt="Original Logo" />
          )}
        </Link>
      </h1>
      <div className='NAV'>
        <ul className='depth1'>
          { user ?
            <li className="member">
              <a href="#" onClick={ handleLogout }>로그아웃</a>
              <Link to="/memberModify" style={{paddingLeft:"10px"}}>({user.userIrum})님</Link>
            </li>
            :
            <li className="member">
              <Link to="/login">로그인</Link>
            </li>
          }
        </ul>
        <ul className='depth1'>
          <li>나의 부름
            <ul className='depth2'>
              <li><Link to="/reservation">완료내역</Link></li>
              <li><Link>청소현황</Link></li>
            </ul>
          </li>
        </ul>
        <ul className='depth1'>
          <li>고객센터
            <ul className='depth2'>
              <li><Link to="/boardList">공지 사항</Link></li>
              <li><Link to="/qna">자주 묻는 질문</Link></li>
            </ul>
          </li>
        </ul>
        <ul className='depth1'>
          {user && user.userId === 'tsalt@hanmail.net' && (
            <li>
              <Link to="/product">마스터</Link>
              <ul className='depth2'>
                <li><Link to="/product">신청 현황</Link></li>
                <li><Link to="/cart">예약 관리</Link></li>
                <li><Link to="/myOrder">예약 현황</Link></li>
              </ul>
            </li>
          )}
        </ul>
        <ul className='depth1'>
          <li className='btn' style={{color:"#fff"}}><Link to="/productApply"><GiBroom />청소 부름</Link></li>
        </ul>
        <ul className='depth1'>
          <li style={{ color: "#0059e9", fontSize: "30px" }} onClick={() => setOpenNav(true)}><FaBars /></li>
        </ul>
        <div className={cn('closeNav', openNav && 'open')}>
          <IoClose className="closeNavIcon" onClick={() => setOpenNav(false)} />
          <div>
            <ul className='openDepth1' onClick={() => toggleSubMenu(1)}>
              <li>나의 부름
                <ul className={cn('openDepth2', openSubMenu === 1 && 'show')} onClick={() => setOpenNav(false)}>
                  <li style={{fontSize:"20px", color:"#fff"}}><Link>완료내역</Link></li>
                  <li style={{fontSize:"20px"}}><Link>청소현황</Link></li>
                  <li style={{fontSize:"20px"}}><Link to="/myOrder">마이 페이지</Link></li>
                </ul>
              </li>
            </ul>
            <ul className='openDepth1' onClick={() => toggleSubMenu(2)}>
              <li>고객센터
                <ul className={cn('openDepth2', openSubMenu === 2 && 'show')} onClick={() => setOpenNav(false)}>
                  <li style={{fontSize:"20px"}}><Link to="/boardList">공지 사항</Link></li>
                  <li style={{fontSize:"20px"}}><Link to="/qna">자주 묻는 질문</Link></li>
                </ul>
              </li>
            </ul>
            <ul className='openDepth1' onClick={() => toggleSubMenu(3)}>
              <li>마스터
                <ul className={cn('openDepth2', openSubMenu === 3 && 'show')} onClick={() => setOpenNav(false)}>
                  <li style={{fontSize:"20px"}}><Link to="/login">로그인</Link></li>
                  <li style={{fontSize:"20px"}}><Link to="/join">회원가입</Link></li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <a href='https://pf.kakao.com/_CKBFT' target='_blank' className='kakao'>카카오톡으로 문의하기</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cn('overlay', openNav && 'show')} onClick={() => setOpenNav(false)} />
    </HeaderBlock>
  );
};

export default Header;