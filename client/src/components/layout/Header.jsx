import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Link, } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initCarts } from '@/store/product';
import { userLogout, localUser } from '@/store/member';
import axios from 'axios';
import logo from '@/assets/image/logo.png';
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
    margin-top:3px;
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
      width:100%
    }
  }

  .depth1:hover .depth2 {
    display: block;
  }

  .btn {
    background: #0059e9;
    border-radius: 50px;
  }

  .btn:hover {
    background: #000;
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
    z-index: 10000000;
  }

  .openDepth1 li {
    padding: 10px 20px;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    font-size: 40px;
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
                  <Link to="/memberModify">정보수정({user.userId})</Link>
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
              <li><Link>완료내역</Link></li>
              <li><Link>청소현황</Link></li>
              <li><Link>마이 페이지</Link></li>
            </ul>
          </li>
        </ul>
        <ul className='depth1'>
          <li>고객센터
            <ul className='depth2'>
              <li><Link>자주 묻는 질문</Link></li>
            </ul>
          </li>
        </ul>
        <ul className='depth1'>
          <li><Link to="/product">마스터</Link>
            <ul className='depth2'>
              <li><Link to="/product">신청 현황</Link></li>
              <li><Link>예약 관리</Link></li>
            </ul>
          </li>
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
                <ul className={cn('openDepth2', openSubMenu === 1 && 'show')}>
                  <li style={{fontSize:"20px", color:"#fff"}}><Link>완료내역</Link></li>
                  <li style={{fontSize:"20px"}}><Link>청소현황</Link></li>
                  <li style={{fontSize:"20px"}}><Link>마이 페이지</Link></li>
                </ul>
              </li>
            </ul>
            <ul className='openDepth1' onClick={() => toggleSubMenu(2)}>
              <li>고객센터
                <ul className={cn('openDepth2', openSubMenu === 2 && 'show')}>
                  <li style={{fontSize:"20px"}}><Link>자주 묻는 질문</Link></li>
                </ul>
              </li>
            </ul>
            <ul className='openDepth1' onClick={() => toggleSubMenu(3)}>
              <li>마스터
                <ul className={cn('openDepth2', openSubMenu === 3 && 'show')}>
                  <li style={{fontSize:"20px"}}><Link to="/login">로그인</Link></li>
                  <li style={{fontSize:"20px"}}><Link to="/join">회원가입</Link></li>
                </ul>
              </li>
            </ul>
            <ul>
              <li>
                <a href='#'>카카오톡으로 문의하기</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </HeaderBlock>
  );
};

export default Header;