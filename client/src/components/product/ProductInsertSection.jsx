import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import Slider from "react-slick";
import { formatCurrency } from '@/components/product/utils';

const ProductInsertSectionBlock = styled.div`
    padding-top: 150px;
    max-width: 500px; margin: 0 auto;
    .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        h2 {
            font-size: 40px;
        }
        p {
            color: #d8d8d8;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 30px;
        .time, .name, .address, .homeType, .serviceType, .description, .btn {
            .container{
                padding: 50px;
                width: 100%;
                height: 500px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .min_title {
                    flex:1;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    label {
                        font-size: 30px;
                        width: 100%;
                    }
                }
                .min_content {
                    flex:1;
                    width: 100%;
                }
            }
        }
        .time {
            select {
                background: #0059e9;
                color: #fff;
                border-radius: 4px;
                border: none;
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                outline: none;
                cursor: pointer;
                text-align: center;
            }
            option {
                background: #fff;
                color: #000;
            }
        }
        .name {
            input {
                background: #fafafa;
                border-radius: 4px;
                padding: 0 30px;
            }
        }
        .address {
            input {
                height: 50px;
                padding: 0 30px;
                background: #fafafa;
            }
            .postNo {
                display: flex;
                input {
                    flex: 1 80%;
                    background: #fafafa;
                    border-radius: 4px;
                    padding: 0 30px;
                    height: 50px;
                    &:focus{
                        outline: 1px solid #0059e9;
                    }
                }
                button {
                    flex: 1 20%;
                    border-radius: 4px;
                    background: #0059e9;
                    color: #fff;
                }
            }
            .min_content {
                display: flex;
                flex-direction: column;
                gap: 10px;
                input {
                    &:focus{
                        outline: 1px solid #0059e9;
                    }
                }
            }
        }
        .serviceType {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            button {
                padding: 10px 30px;
                border-radius: 4px;
            }
            button.selected {
                background: #0059e9;
                color: #fff;
            }
        }
        input, select, textarea, button {
            width: 100%;
            max-width: 500px;
            height: 39px;
        }
        .btn {
            button {
                background: #0059e9;
                color: #fff;
                padding: 10px 30px;
                border-radius: 4px;
                cursor: pointer;
                &:focus {
                    outline: none;
                }
            }
        }
    }
`;

const ProductInsertSection = () => {
    const [product, setProduct] = useState({
        category: "no_select",
        name: "",
        zipCode: "",
        addr1: "",
        addr2: "",
        homeType: "no_select",
        productType: "기본형",
        description: "",
        photo: "",
        qty: 1,
        price: 0,
    });
    const user = useSelector((state) => state.members.user);
    const [totalPrice, setTotalPrice] = useState(0);
    const mAddressSubRef = useRef("");
    const [photoValue, setPhotoValue] = useState("");
    const sliderRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        if(name === 'homeType'){
            let homeTypePrice = 0;
            if (value === '다세대·다가구') {
                homeTypePrice = 150000;
            } else if (value === '오피스텔·도시형생활주택') {
                homeTypePrice = 100000;
            } else if (value === '아파트') {
                homeTypePrice = 300000;
            }
            setTotalPrice(homeTypePrice);
        }
        setProduct(product => ({ ...product, [name]: value }));
    };

    const handleInputFocus = () => {
        setIsTyping(true); // 입력 중으로 설정
    };

    const handleInputBlur = () => {
        setIsTyping(false); // 입력이 끝남
        sliderRef.current.slickNext();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProduct(prevProduct => ({ ...prevProduct, photo: file }));
        setPhotoValue(e.target.value);
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("category", product.category);
        formData.append("name", product.name);
        formData.append("zipCode", product.zipCode);
        formData.append("addr1", product.addr1);
        formData.append("addr2", product.addr2);
        formData.append("homeType", product.homeType);
        formData.append("description", product.description);
        formData.append("productType", product.productType);
        formData.append("qty", product.qty);
        formData.append("price", totalPrice);
        if (product.photo) {
            formData.append("photo", product.photo);
        }
        formData.append("userNo", user.userNo);

        try {
            const res = await axios.post("http://localhost:8001/product/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.data.affectedRows === 1) {
                setProduct({
                    category: "no_select",
                    name: "",
                    zipCode: "",
                    addr1: "",
                    addr2: "",
                    homeType: "no_select",
                    productType: "기본형",
                    description: "",
                    qty: 1,
                    price: 0,
                    photo: ""
                });
                setPhotoValue("");
            } else {
                alert("상품등록 실패");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                let fullAddr = '';
                let extraAddr = '';
                if (data.userSelectedType === 'R') {
                    fullAddr = data.roadAddress;
                } else {
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
                setProduct(prevState => ({
                    ...prevState,
                    zipCode: data.zonecode,
                    addr1: fullAddr,
                    addr2: ""
                }));
                mAddressSubRef.current.focus();
            },
        }).open();
    };

    const handleProductTypeClick = (type) => {
        let priceDifference = 0;
        if (type === '고급형') {
            priceDifference = 400000 - (product.productType === '고급형' ? 400000 : 200000);
        } else {
            priceDifference = 200000 - (product.productType === '고급형' ? 400000 : 200000);
        }
        setProduct(prevProduct => ({ ...prevProduct, productType: type }));
        setTotalPrice(totalPrice + priceDifference);
    };

    return (
        <ProductInsertSectionBlock>
            <div className='title' style={{paddingTop: '30px'}}>
                <img src="/src/assets/image/logo_color.png" alt="" />
            </div>
            <form onSubmit={onSubmit}>
                <Slider ref={sliderRef} {...settings}>
                    <div className='time'>
                        <div className='container'>
                            <div className='min_title'>
                                <label htmlFor="category">방문하고자 하는 시간을<br/> 선택해주세요.</label>
                            </div>
                            <div className='min_content'>
                                <select name="category" id="category" value={product.category} onChange={handleChange}  onFocus={handleInputFocus} onBlur={handleInputBlur}>
                                    <option value="no_select" disabled>방문 희망시간</option>
                                    <option value="오전(8시~10시)">오전(8시~10시)</option>
                                    <option value="오후(13시~15시)">오후(13시~15시)</option>
                                    <option value="저녁(15시~17시)">저녁(15시~17시)</option>
                                    <option value="언제든 가능">언제든 가능</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='name'>
                        <div className='container'>
                            <div className='min_title'>
                                <label htmlFor="name">성함을 입력해주세요.</label>
                            </div>
                            <div className='min_content'>
                                <input required type="text" name="name" id="name" value={product.name} onChange={handleChange} onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder='이름' />
                            </div>
                        </div>
                    </div>
                    <div className='address'>
                        <div className='container'>
                            <div className='min_title'>
                                <label htmlFor="addr1">부름을 부르실 주소를<br/> 입력해주세요.</label>
                            </div>
                            <div className='min_content'>
                                <div className='postNo'>
                                    <input style={{ width: '150px' }} type="text" name="zipCode" id="zipCode" value={product.zipCode} onChange={handleChange} readOnly placeholder='우편번호' />
                                    <button type="button" onClick={openDaumPostcode} style={{ height: '50px', verticalAlign: 'middle', padding: '0 5px', marginRight: '5px' }}>주소검색</button>
                                </div>
                                <div className='addr1'>
                                    <input type="text" name="addr1" id="addr1" value={product.addr1} onChange={handleChange} onClick={openDaumPostcode} readOnly placeholder='주소입력' />
                                </div>
                                <div className='addr2'>
                                    <input type="text" name="addr2" id="addr2" ref={mAddressSubRef} value={product.addr2}  onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleChange} placeholder='층,동,호수 입력' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='homeType'>
                        <div className='container'>
                            <div className='min_title'>
                                <label htmlFor="homeType">건물의 유형을 선택해주세요.</label>
                            </div>
                            <div className='min_content'>
                                <select name="homeType" id="homeType" value={product.homeType} onChange={handleChange}  onFocus={handleInputFocus} onBlur={handleInputBlur}>
                                    <option value="no_select" disabled>선택</option>
                                    <option value="다세대&#183;다가구">다세대&#183;다가구</option>
                                    <option value="오피스텔&#183;도시형생활주택">오피스텔&#183;도시형생활주택</option>
                                    <option value="아파트">아파트</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='serviceType'>
                        <div className='container'>
                            <div className='min_title'>
                                <label>서비스 유형을 선택해주세요.</label>
                            </div>
                            <div className='min_content'>
                                <button type="button" className={product.productType === "기본형" ? "selected" : ""} onClick={() => handleProductTypeClick("기본형")}>기본형</button>
                                <button type="button" className={product.productType === "고급형" ? "selected" : ""} onClick={() => handleProductTypeClick("고급형")}>고급형</button>
                            </div>
                        </div>
                    </div>
                    <div className='description'>
                        <div className='container'>
                            <div className='min_title'>
                                <label htmlFor="description">특이사항이 있으면 남겨주세요</label>
                            </div>
                            <div className='min_content'>
                                <textarea name="description" id="description" value={product.description} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="btn">
                        <div className='container'>
                            <div className='min_title'>
                                <div style={{fontSize: '25px'}}>예상금액은 '{formatCurrency(totalPrice)}' 원 이에요. <br/> 접수를 등록하시겠어요?</div>
                            </div>
                            <div className='min_content'>
                                <button type="submit">등록</button>
                            </div>
                        </div>
                    </div>
                </Slider>
            </form>
        </ProductInsertSectionBlock>
    );
};

export default ProductInsertSection;