import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import google from '../../assets/image/icon_google.png';
import appStore from '../../assets/image/icon_app_store.png';
import insta from '../../assets/image/icon_insta.png';
import naver from '../../assets/image/icon_naver.png';

const FooterBlock = styled.footer`
    background-color: #f8f8f8;
    padding: 20px 0;
    text-align: center;
    border-top: 1px solid #ddd;
    color: #666;

    .footer-links {
        margin-bottom: 10px;
        a {
            color: #333;
            margin: 0 10px;
            text-decoration: none;
            font-weight: 500;
            &:hover {
                text-decoration: underline;
            }
        }
        span {
            margin: 0 5px;
            color: #999;
        }
    }

    .footer-info {
        margin-bottom: 20px;
        line-height: 1.6;
    }

    .social-icons {
        a {
            margin: 0 10px;
            img {
                width: 24px;
                height: 24px;
                transition: transform 0.3s ease;
                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }

    .footer-copy {
        margin-top: 10px;
        font-size: 0.9em;
        color: #999;
    }
    @media (max-width: 768px){
        padding-bottom:60px;
    }
`;

const Footer = () => {
    return (
        <FooterBlock>
            <div className="footer-links">
                <Link to="#">서비스 이용약관</Link> <span>|</span>
                <Link to="#">개인정보처리방침</Link> <span>|</span>
                <Link to="#">고객센터</Link>
            </div>
            <div className="footer-info">
                청소 부름 대표: 손정혁 | 사업자등록번호: 509-60-86310<br />
                주소: 경기도 하남시 미사강변중앙로 208, 7층 701-a-22호 | 전화 : 1544-5356 | 이메일 : cleanbroom@naver.com
            </div>
            <div className="social-icons">
                <a href="https://play.google.com/store/apps/details?id=com.cleanbroom.broom" target='_blank'><img src={google} alt="Google" /></a>
                <a href="https://apps.apple.com/kr/app/%EC%B2%AD%EC%86%8C%EB%B6%80%EB%A6%84/id1525188150" target='_blank'><img src={appStore} alt="App Store" /></a>
                <a href="https://www.instagram.com/clean.broom/" target='_blank'><img src={insta} alt="Instagram" /></a>
                <a href="https://blog.naver.com/cleanbroom" target='_blank'><img src={naver} alt="Naver" /></a>
            </div>
            <div className="footer-copy">
                Copyright 2023 Clean Broom Co. all rights reserved.
            </div>
        </FooterBlock>
    );
};

export default Footer;