import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import AOS from "aos"
import 'aos/dist/aos.css' ;

const PaymentSectionBlock = styled.div`
height: 700px;
h2.title {
    text-align: center;
    padding: 16px 0;
    color: #0059e9;
}
.content {
    background: #fff;
    padding: 16px 24px;
    margin: 0 16px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    .orderList {
        h2 {
            font-weight: 500;
            color: #000;
            text-align: left;
        }
        .list {
            padding-top: 16px;
            .category {
                display: flex;
                flex-direction: column;
                gap: 16px;
                .name {
                    display: flex;
                    .first {
                    width: 100px;
                    color:#999999;
                    }
                }
                }
                .price {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #eeeeee;
                    border-top: 1px solid #eeeeee;
                    padding: 16px 0;
                    p:nth-child(2) {
                        color: #0059e9;
                        font-size:24px;
                        font-weight: 600;
                        span {
                            color: #000;
                            font-size: 15px;
                            font-weight: 400;
                        }
                    }
                }
        }
    }
    .customerInfo {
        display: flex;
        flex-direction: column;
        gap: 16px;
        .infoContent {
            display: flex;
            flex-direction: column;
            gap: 16px;
            .contentRow {
                display: flex;
                .rowTitle {
                    width: 100px;
                    font-weight: 600;
                }
                .rowContent {
                    border-bottom: 1px solid #eeeeee;
                    width: 100%;
                    padding-bottom: 10px;
                }
            }
        }
    }
}

`

const PaymentSection = ({product, path}) => {
    useEffect(() => {
        AOS.init({
        duration: 1000,
        });
    }, []);
    
    let total = 0
    if (path =='cart') {
        total = product.reduce((acc, item)=>acc+(parseInt(item.price) * parseInt(item.qty)), 0)
    }
    const user = useSelector(state=>state.members.user)
    console.log(user)
    const mZipcodeRef = useRef("")
    const mAddressRef = useRef("")
    const mAddressSubRef = useRef("")

    const [userInfo, setUserInfo] = useState({
        userId: user.userId,
        userIrum: user.userIrum,
        handphone: user.handphone,
        zipCode : user.zipCode,
        addr1 : user.addr1,
        addr2 : user.addr2
    })

    const handleChange = (e)=>{
        const {value, name } = e.target
        setUserInfo(userInfo=>({...userInfo, [name]:value}))
    }

    const [placeType, setPlaceType] = useState('default');
    const placeTypeChange = (type) => {
        setPlaceType(type);
      };
    const [message, setMessage] = useState();
    const onReset = (type)=>{
        if (type=="default") {
            setUserInfo({
                userId: user.userId,
                userIrum: user.userIrum,
                handphone: user.handphone,
                zipCode: user.zipCode,
                addr1 : user.addr1,
                addr2 : user.addr2
            })
        } else {
            setUserInfo({
                userId: "",
                userIrum: "",
                handphone: "",
                zipCode: "",
                addr1 : "",
                addr2 : ""
            })
        }
    }

    useEffect(() => {
        window.openDaumPostcode = () => {
          new window.daum.Postcode({
            oncomplete: (data) => {
              let fullAddr = ''; // 최종 주소 변수
              let extraAddr = ''; // 조합형 주소 변수
              if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                fullAddr = data.roadAddress;
              } else { // 사용자가 지번 주소를 선택했을 경우(J)
                fullAddr = data.jibunAddress;
              }
              if (data.userSelectedType === 'R') {
                if (data.bname !== '') {
                  extraAddr += data.bname;
                }
                if (data.buildingName !== '') {
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
              }
              // 주소 정보를 입력 요소에 설정
              setUserInfo(prevState => ({
                  ...prevState,
                  zipCode: data.zonecode,
                  addr1: fullAddr
              }));
              mAddressSubRef.current.focus();
            },
          }).open();
        };
    }, []);


    return (
        <PaymentSectionBlock data-aos='fade-up' >
            <h2 className='title'>예약확정</h2>
            <div className='content'>
                <div className="orderList">
                    <h2>확정예약목록</h2>
                    <div className='list'>
                        {product.map((item, index)=>(
                            <div className='category' key={index}>
                                <div className='name'>
                                    <div className='first'>
                                        성명
                                    </div>
                                    <div>
                                        {item.name} 
                                    </div>
                                </div>
                                <div className='name'>
                                    <div className='first'>
                                        집구조
                                    </div>
                                    <div>
                                        {item.homeType}
                                    </div>
                                </div>
                                <div className='name'>
                                    <div className='first'>
                                        서비스유형
                                    </div>
                                    <div>
                                        {item.productType} 
                                    </div>
                                </div>
                            </div>
                        )) 
                        }
                        <div className='price'>
                            <p>예약기본금액</p>
                            <p>{total.toLocaleString()}<span>원</span></p>
                        </div>
                    </div>
                </div>
                <div className="customerInfo">
                    <h2 style={{fontWeight:'600'}}>마스터 배정</h2>
                    <div className='infoContent'>
                        <div className='contentRow'>
                            <div className='rowTitle'>이름</div>
                            <div className='rowContent'>{userInfo.userIrum}</div>
                        </div>
                        <div className='contentRow'>
                            <div className='rowTitle'>전화번호</div>
                            <div className='rowContent'>
                                <input type="text" name="handphone" value={userInfo.handphone} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='contentRow'>
                            <div className='rowTitle'>이메일</div>
                            <div className='rowContent'>
                                <input type="text" name="userId" value={userInfo.userId} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign:'center'}}>
                    <Link to="/paymentFinish" state={{ product, path }} style={{ padding:'12px 16px', background:'#0059e9', color:'#fff', borderRadius:"10px", width:'100%'}}>예약확정</Link>
                </div>
            </div>
        </PaymentSectionBlock>
    );
};

export default PaymentSection;