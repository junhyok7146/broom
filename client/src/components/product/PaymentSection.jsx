import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

const PaymentSectionBlock = styled.div`
max-width: 700px;
margin: 0 auto;
overflow: hidden;
border: 1px solid #ddd;
    h2 { margin:20px 0; text-align: center; font-size: 18px; }
    table { margin-bottom:50px; border: 1px solid #f0f3f5;  border-collapse: collapse; }
    table.orderList {
        col:nth-child(1) { width:auto}
        col:nth-child(2) { width:150px; }
        col:nth-child(3) { width:150px; }
        thead { 
            th { 
                padding:5px;
                background: #fafafa;
            }
        }
        tbody { td { padding:10px } }
        tfoot {
            td { text-align:center; 
                >div {
                  padding:20px; 
                  display:flex; 
                  justify-content:center; 
                  align-items:center;  
                  >div { margin:0 20px; 
                       p:nth-child(2) { font-size:30px }
                    }
                }
            }
        }
    }

    table.customerInfo {
        col:nth-child(1) { width:150px }
        col:nth-child(2) { width:auto }
        tbody { td { padding:10px } }
        input[type=text] { border:1px solid #ddd; height:30px; width:400px; padding-left:10px }
        input[type=radio] + span { margin-right:20px }
    }

`

const PaymentSection = ({product, path}) => {
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
        <PaymentSectionBlock>
            <h2>확정예약목록</h2>
            <table className="orderList" border="1">
                <colgroup>
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>옵션</th>
                        <th>기본금액</th>
                    </tr>
                </thead>
                <tbody>
                    { path=='detail' ? product.map((item, index)=>(
                        <tr key={index}>
                            <td><img src={`http://localhost:8001/uploads/${item.product.photo}`} alt={item.product.name} /> 상품명 : {item.product.name} / 수량 : {item.qty}개 / 가격 : {parseInt(item.product.price).toLocaleString()}원</td>
                            <td style={{textAlign:"right"}}>{(parseInt(item.qty)*parseInt(item.product.price)).toLocaleString()}원</td>
                        </tr>
                    )) :
                    product.map((item, index)=>(
                        <tr key={index}>
                            <td>{item.name} / {item.homeType}/ {item.productType}</td>
                            <td style={{textAlign:"right"}}>{(parseInt(item.qty)*parseInt(item.price)).toLocaleString()}원</td>
                        </tr>
                    )) 
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">
                            <div>
                                <div>
                                    <p>예약기본금액</p>
                                    <p>{total.toLocaleString()}원</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <h2>마스터 배정/ 예약문자 발송</h2>
            <table className="customerInfo" border="1">
                <colgroup>
                    <col />
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <td>마스터 배정</td>
                        <td>{userInfo.userIrum}</td>
                    </tr>
                    <tr>
                        <td>마스터 지역</td>
                        <select>
                            <option value="경기도">경기도</option>
                            <option value="서울">서울</option>
                        </select>
                    </tr>
                    <td>예약문자</td>
                    <textarea id="message" name="message" rows="4" cols="50" value={message} onChange={(e) => setMessage(e.target.value)}>
    
                    </textarea>
                    <tr>
                        <td>마스터 전화번호</td>
                        <td>
                            <input type="text" name="handphone" value={userInfo.handphone} onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>
                            <input type="text" name="userId" value={userInfo.userId} onChange={handleChange} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{ textAlign:'center'}}>
                <Link to="/paymentFinish" state={{ product, path }} style={{ padding:'10px', background:'#0059e9', color:'#fff', borderRadius:"10px", width:"80%", margin: "20px auto"}}>예약확정</Link>
            </div>
        </PaymentSectionBlock>
    );
};

export default PaymentSection;