import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '@/assets/image/join_logo.png';

const JoinSectionBlock = styled.div`
    max-width: 400px;
    margin: 50px auto;
    padding-top: 110px;
    text-align: center;

    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 20px;
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
        width: 100%;
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

    .message {
        font-size: 14px;
        color: #ff0000;
        margin-bottom: 10px;
    }

    .address-section {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .address-section button {
        width: 100%;
        height: 40px;
        background: #0059e9;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
    }

    .btn {
        margin-top: 20px;
        button{
            padding:10px 20px;
        }
    }
`;

const JoinSection = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const userIdRef = useRef("");
    const userPwRef = useRef("");
    const userPwOkRef = useRef("");
    const mZipcodeRef = useRef("");
    const mAddressRef = useRef("");
    const mAddressSubRef = useRef("");
    const [userInfo, setUserInfo] = useState({
        userId: "",
        userPw: "",
        userPwOk: "",
        userIrum: "",
        handphone: "",
        zipCode: "",
        addr1: "",
        addr2: ""
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setUserInfo(userInfo => ({ ...userInfo, [name]: value }));
    };

    const register = async (e) => {
        e.preventDefault();
        if (!userInfo.userId) {
            alert("이메일을 입력하세요.");
            userIdRef.current.focus();
            return;
        }
        if (!userInfo.userPw) {
            alert("비밀번호를 입력하세요.");
            userPwRef.current.focus();
            return;
        }
        if (!userInfo.userPwOk) {
            alert("비밀번호를 입력하세요.");
            userPwOkRef.current.focus();
            return;
        }
        if (userInfo.userPw !== userInfo.userPwOk) {
            alert("비밀번호가 일치하지 않습니다.");
            userPwRef.current.focus();
            return;
        }

        if (message === "중복된 아이디입니다.") {
            alert("중복된 아이디입니다.");
            return;
        }

        const addMember = {
            userId: userInfo.userId,
            userPw: userInfo.userPw,
            userIrum: userInfo.userIrum,
            handphone: userInfo.handphone,
            zipCode: userInfo.zipCode,
            addr1: userInfo.addr1,
            addr2: userInfo.addr2
        };
        try {
            const res = await axios.post('http://localhost:8001/auth/join', { addMember });
            if (res.data.affectedRows === 1) {
                alert("회원가입이 성공했습니다.");
                navigate("/login");
            } else {
                alert("실패");
            }
        } catch (err) {
            console.log(err.toJSON());
        }
    };

    const idCheck = async (value) => {
        try {
            const res = await axios.post("http://localhost:8001/auth/idcheck", { userId: value });
            if (res.data[0]) {
                setMessage("중복된 아이디입니다.");
            } else {
                setMessage("가능한 아이디입니다.");
            }
        } catch (err) {
            console.log(err.toJSON());
        }
    };

    useEffect(() => {
        window.openDaumPostcode = () => {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    let fullAddr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
                    if (data.userSelectedType === 'R') {
                        if (data.bname !== '') fullAddr += ' ' + data.bname;
                        if (data.buildingName !== '') fullAddr += ' ' + data.buildingName;
                    }
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
        <JoinSectionBlock>
            <h2><img src={logo} alt="logo" /></h2>
            <form onSubmit={register}>
                <div className="message">{message}</div>
                <input type="text" name="userId" placeholder="이메일" ref={userIdRef} value={userInfo.userId} onChange={(e) => { handleChange(e); idCheck(e.target.value); }} />
                <input type="password" name="userPw" placeholder="비밀번호" ref={userPwRef} value={userInfo.userPw} onChange={handleChange} />
                <input type="password" name="userPwOk" placeholder="비밀번호 확인" ref={userPwOkRef} value={userInfo.userPwOk} onChange={handleChange} />
                <input type="text" name="userIrum" placeholder="이름" value={userInfo.userIrum} onChange={handleChange} />
                <input type="text" name="handphone" placeholder="휴대폰번호" value={userInfo.handphone} onChange={handleChange} />
                <div className="address-section">
                    <button type="button" onClick={window.openDaumPostcode}>우편번호 찾기</button>
                    <input type="text" name="zipCode" placeholder="우편번호" ref={mZipcodeRef} value={userInfo.zipCode} onChange={handleChange} readOnly />
                    <input type="text" name="addr1" placeholder="주소" ref={mAddressRef} value={userInfo.addr1} onChange={handleChange} readOnly />
                    <input type="text" name="addr2" placeholder="상세 주소" ref={mAddressSubRef} value={userInfo.addr2} onChange={handleChange} />
                </div>
                <div className="btn">
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </JoinSectionBlock>
    );
};

export default JoinSection;