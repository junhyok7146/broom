import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initCarts } from '@/store/product';
import { userLogout, localUser } from '@/store/member';
import axios from 'axios';
import logo from '@/assets/image/logo.png';
import { FaBars } from "react-icons/fa6";
import { GiBroom } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import cn from 'classnames';

const HeaderBlock = styled.div`
  text-align: center;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999999;
  
  .header__logo { padding: 15px 45px; float: left; }
  }
  
  .NAV {
    position: relative;
    display: flex;
    justify-content: flex-end;
    padding: 30px;
  }
  
  .depth1 {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: flex-end;
  }
  
  .depth1 li {
    padding: 10px 20px;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    font-size: 19px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .depth2 {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #0059e9;
    padding: 5px;
    color: #fff;
    min-width: 200px;
    font-size: 16px;
    text-align: center;
    a {
      display: block;
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

const Header = () => {
  const navigate = useNavigate();
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
    <HeaderBlock>
      <h1 className="header__logo">
        <Link to="/"><img src={logo} alt="" /></Link>
      </h1>
      <div className='NAV'>
        <ul className='depth1'>
          <li>나의 부름
            <ul className='depth2'>
              <li>완료내역</li>
              <li>청소현황</li>
              <li>마이 페이지</li>
            </ul>
          </li>
        </ul>
        <ul className='depth1'>
          <li>고객센터
            <ul className='depth2'>
              <li>자주 묻는 질문</li>
            </ul>
          </li>
        </ul>
        <ul className='depth1'>
          <li>마스터
          <ul className='depth2'>
              <li>로그인</li>
              <li>회원가입</li>
            </ul>
          </li>
        </ul>
        <ul className='depth1'>
          <li className='btn'><Link to=""><GiBroom />청소 부름</Link></li>
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
                  <li style={{fontSize:"20px"}}><Link>완료내역</Link></li>
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
                  <li style={{fontSize:"20px"}}><Link>로그인</Link></li>
                  <li style={{fontSize:"20px"}}><Link>회원가입</Link></li>
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