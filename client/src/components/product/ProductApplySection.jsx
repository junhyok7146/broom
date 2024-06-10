import React,{useEffect} from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AOS from "aos"
import 'aos/dist/aos.css' ;

const ProductApplySectionBlock= styled.div`
display: flex;
flex-direction: column;
gap: 20px;
max-width: 500px;
height: 600px;
margin: auto;
    .title{
        display: flex;
        flex-direction: column;
        gap: 10px;
        h2 {
            font-size: 20px;
        }
        p {
            font-size: 13px;
            color: #777;
        }
    }

    .main {
        display: flex;
        justify-content: center;
        padding: 0 15px;
        .image{
            background: url("/src/assets/image/apply_img.jpg") no-repeat center;
            height: 350px;
            width: 100%;
            position: relative;
            .detail {
                position: absolute;
                display: flex;
                justify-content: space-between;
                top: 0;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.5);
                align-items:center;
                .detailContent{
                    padding: 10px;
                    p {
                        font-size: 12px;
                        color:#0059e9;
                        margin-bottom: 8px;
                    }
                    h3 {
                        font-size: 18px;
                        color:#333;
                    }
                }
                .cleanDetail {
                    border: 2px solid #0059e9;
                    padding: 4px 20px;
                    height: 30px;
                    width: 120px;
                    font-size: 12px;
                    border-radius: 15px;
                    color: #0059e9;
                    font-weight: bold;
                }
            }
            .apply_button {
                width: 100%;
                display: flex;
                justify-content: center;
                position: absolute;
                bottom: 2%;
                a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    margin: 0 5px;
                    background: #0059e9;
                    color: #fff;
                    height: 50px;
                }
            }
        }
    }
`

const ProductApplySection = () => {
    useEffect(() => {
        AOS.init({
        duration: 700,
        });
    }, []);
    

    return (
        <ProductApplySectionBlock data-aos="fade-up">
            <div className='title'>
                <h2>서비스 이용 안내</h2>
                <p>면적과 구조에 따른 합리적인 청소비용을 확인하세요</p>
            </div>

            <div className='main'>
                <div className='image'>
                    <div className='detail'>
                        <div className='detailContent'>
                            <p>전용면적 16평 이하</p>
                            <h3>소형주거공간</h3>
                        </div>
                        <div className='cleanDetail'>
                            청소범위보기
                        </div>
                    </div>
                    <div className='apply_button'>
                    <Link to="/productInsert">청소 신청</Link> 
                    </div>
                </div>
            </div>
        </ProductApplySectionBlock>
    );
};

export default ProductApplySection;