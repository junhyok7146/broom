import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userLogin } from '@/store/member';
import { fetchCart } from '@/store/product';
import logo from '@/assets/image/join_logo.png';
import AOS from "aos"
import 'aos/dist/aos.css' ;

const LoginSectionBlock = styled.div`
    max-width: 500px;
    height: 600px;
    margin: 50px auto;
    text-align: center;

    h2 img {
        width: 150px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 20px;
        padding: 0 30px;
    }

    label {
        display: none;
    }

    input {
        border: 1px solid #ddd;
        border-radius: 5px;
        height: 40px;
        padding: 0 10px;
        font-size: 14px;
    }

    button {
        padding: 10px 0;
        background: #0059e9;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    .link-container {
        margin-top: 10px;
    }

    a {
        color: #0059e9;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
`;

const LoginSection = () => {
    useEffect(() => {
        AOS.init({
        duration: 1000,
        });
    }, []);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");

    const userIdRef = useRef("");
    const userPwRef = useRef("");

    const previousUrl = sessionStorage.getItem('previousUrl');
    const choiceProduct = sessionStorage.getItem('choiceProduct');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("아이디를 입력해 주세요.");
            userIdRef.current.focus();
            return;
        }
        if (!userPw) {
            alert("비밀번호를 입력하세요.");
            userPwRef.current.focus();
            return;
        }
        
        try {
            const res = await axios.post("http://localhost:8001/auth/login", { userId, userPw });
            if (res.data[0]) {
                dispatch(userLogin(res.data[0]));
                dispatch(fetchCart(res.data[0].userNo));
                if (previousUrl === '/payment') {
                    navigate(previousUrl, { state: JSON.parse(choiceProduct) });
                    sessionStorage.removeItem('previousUrl');
                } else if (previousUrl === '/product' || previousUrl === '/cart') {
                    navigate(previousUrl);
                    sessionStorage.removeItem('previousUrl');
                } else {
                    navigate('/');
                }
            } else {
                alert("회원이 아닙니다.");
                userIdRef.current.focus();
            }
        } catch (err) {
            console.log(err.toJSON());
        }
    };

    return (
        <LoginSectionBlock>
            <h2 data-aos='fade-up'><img src={logo} alt="logo" /></h2>
            <form onSubmit={handleLogin} data-aos='fade-up'>
                <input ref={userIdRef} type="text" placeholder="아이디" onChange={(e) => setUserId(e.target.value)} />
                <input ref={userPwRef} type="password" placeholder="비밀번호" onChange={(e) => setUserPw(e.target.value)} />
                <button type="submit">로그인</button>
                <div className='link-container'>
                    <Link to="/join">회원가입</Link>
                </div>
            </form>
        </LoginSectionBlock>
    );
};

export default LoginSection;