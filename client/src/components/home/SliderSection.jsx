import React, { useState, useRef} from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { IoIosPause, IoIosPlay } from 'react-icons/io';
import { GiBroom } from "react-icons/gi";
import { Link } from 'react-router-dom';
import scrollDown from '@/assets/image/icon_scrollDwn.png';
import MapModal from '@/components/home/MapModal';


const SliderSectionBlock = styled.div`
    position: relative; 
    .slide {
        height: 100vh; 
        background-size: cover;
        background-position: center;
        &.slide1 { background-image: url('./assets/image/02_bg_211214.png'); }
        &.slide2 { background-image: url('./assets/image/01_bg_240318.jpg'); }
        position:relative;
    }
    .slick-arrow {
        display: none !important;
    }
    .slick-dots { 
        position: absolute;
        bottom: 40%; 
        left: 20%; 
        transform: translate(-50%);
        display: flex;
        align-items: center;
        li { 
            display: inline-block; 
            padding: 0 5px; 
            button { 
                width: 10px; 
                height: 10px; 
                border: 1px solid #fff;
                border-radius: 50%; 
                background: transparent; 
                text-indent: -9999px; 
                overflow: hidden; 
            }
            &.slick-active { 
                button { 
                    background: #fff; 
                } 
            }
        }
        .control-button {
            display: flex;
            align-items: center;
            margin-left: 60px;
            cursor: pointer;
            font-size: 20px;
            color: #fff;
        }
    }
    .slideText {
        position:absolute;
        text-align: center;
        color: #fff;
        transition: bottom 0.5s;
        bottom: 45%; 
        left: 10%;
        display:flex;
        flex-direction: column;
        align-items: flex-start;
        text-align:left;
        p {
            font-size: 24px;
            margin-bottom: 50px;
            font-size:5vh;
            font-weight:bold;
        }
        .call {
            display: inline;
            margin-bottom: 10px;
            color: #fff;
            text-decoration: none;
            font-size: 2vh;
            background:#0059e9;
            padding:10px 30px;
            width:10vw;
            word-break: keep-all;
            svg {
                margin-right: 5px;
            }
        }
        .service {
            display: inline;
            padding:10px 30px;
            font-size: 2vh;
            border:2px solid #dedede;
            width:15vw;
            height:1vh;
            margin-left:15px;
            word-break: keep-all;
        }
    }
    .scrolldown {
        position: absolute;
        top: 90%;
        left: 50%;
        animation: scrollAnimation 1s infinite alternate;
    }
    @keyframes scrollAnimation {
        0% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(10px);
        }
    }
`;

const SliderSection = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const sliderRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = ()=>{setModalOpen(false)}

    const handlePausePlay = () => {
        if (isPlaying) {
            sliderRef.current.slickPause();
        } else {
            sliderRef.current.slickPlay();
        }
        setIsPlaying(!isPlaying);
    };

    const options = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: null,
        nextArrow: null
    };
    
    return (
        <SliderSectionBlock>
            <Slider ref={sliderRef} {...options}>
                <div className="slide slide1">
                    <div className='slideText'>
                        <div><p>청소부터 리포트까지</p>
                        <p style={{fontSize:"20px"}}>#하차점검 #전후사진 #비대면 #현장확인 #청소리포트</p>
                        </div>
                        <div>
                            <Link className='call'><GiBroom />청소부름!</Link>
                            <a href='' className='service' onClick={(e)=>{e.preventDefault(); setModalOpen(true)}}>서비스 지역보기+</a>
                        </div>
                    </div>
                </div>
                <div className="slide slide2">
                   <div className='slideText'>
                        <div><p>원룸, 오피스텔, 아파트 입주청소</p>
                        <p style={{fontSize:"20px"}}>#대청소 #이사청소 #퇴실청소 #거주청소 #에어컨청소</p>
                        </div>
                        <div>
                            <Link className='call'><GiBroom />청소부름!</Link>
                            <a href='' className='service' onClick={(e)=>{e.preventDefault(); setModalOpen(true)}}>서비스 지역보기+</a>
                        </div>
                   </div>
                </div>
            </Slider>
          
            <div className="slick-dots">
                <ul className="slick-dots">
                    <div className="control-button" onClick={handlePausePlay}>
                        {isPlaying ? <IoIosPause /> : <IoIosPlay />}
                    </div>
                </ul>
            </div>
            <div className='scrolldown'>
                        <img src={scrollDown} alt="mousemoving" />
            </div>
            <MapModal modalOpen={modalOpen} onClose={closeModal} />
        </SliderSectionBlock>
    );
};

export default SliderSection;