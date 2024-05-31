import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ProductInsertSectionBlock = styled.div`
    max-width: 500px; margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
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
        gap: 60px;
        .time {
            display: flex;
            height: 50px;
            select {
                flex:1;
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
        .getName {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            label {
                font-size: 18px;
            }
            input {
                width: 100%;
                height: 50px;
                background: #fafafa;
                border-radius: 4px;
                padding: 0 30px;
                &:focus{
                    outline: 2px solid #0059e9;
                }
            }
        }
        .address {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            label {
                font-size: 18px;
            }
            .postNo {
                display: flex;
                width: 100%;
                height: 50px;
                input {
                    flex: 1 80%;
                    background: #fafafa;
                    border-radius: 4px;
                    padding: 0 30px;
                    &:focus{
                        outline: 2px solid #0059e9;
                    }
                }
                button {
                    flex: 1 20%;
                    border-radius: 4px;
                    background: #0059e9;
                    color: #fff;
                }
            }
            .addr1 {
                width: 100%;
                input {
                    width: 100%;
                    height: 50px;
                    background: #fafafa;
                    border-radius: 4px;
                    padding: 0 30px;
                    &:focus{
                        outline: 2px solid #0059e9;
                    }
                }
            }
            .addr2 {
                width: 100%;
                input {
                    width: 100%;
                    height: 50px;
                    background: #fafafa;
                    border-radius: 4px;
                    padding: 0 30px;
                    &:focus{
                        outline: 2px solid #0059e9;
                    }
                }
            }
        }
        .homeType {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            select {
                width: 100%;
                height: 50px;
                background: #0059e9;
                color: #fff;
                border: none;
                border-radius: 4px;
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                outline: none;
                cursor: pointer;
                text-align: center;
            }
            option{
                background: #fff;
                color: #000;
            }
        }
        .serviceType{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            button {
                padding: 10px 30px;
                border-radius: 4px;
            }
            button.selected { background: #0059e9; color: #fff; }
        }
        .description {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;

            textarea {
                width: 500px;
                height: 200px;
                border-radius: 5px;
                border: 1px solid #0059e9;
                padding: 20px;
                &:focus {
                    outline: none;
                }
            }
        }
        .btn {
            display: flex;
            justify-content: center;
            button{
                background:#0059e9;
                padding: 10px 30px;
                color: #fff;
                border-radius: 4px;
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
    const [totalPrice, setTotalPrice] = useState(0);
    const mAddressSubRef = useRef("");
    const [photoValue, setPhotoValue] = useState("");
    const handleChange = (e) => {
        const { value, name } = e.target;
        if(name== 'homeType'){
            let homeTypePrice = 0;
        if (name === 'homeType') {
            if (value === '다세대·다가구') {
                homeTypePrice = 150000;
            } else if (value === '오피스텔·도시형생활주택') {
                homeTypePrice = 100000;
            } else if (value === '아파트') {
                homeTypePrice = 300000;
            }
        }
        setTotalPrice(homeTypePrice)
        }
        setProduct(product => ({ ...product, [name]: value }));
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
        axios.post("http://localhost:8001/product/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then((res) => {
            if (res.data.affectedRows == 1) {
                setProduct({
                    category: "no_select",
                    name: "",
                    zipCode: "",
                    addr1: "",
                    addr2: "",
                    homeType: "no_select",
                    productType: "기본형",
                    description: "",
                    qty:1,
                    price: 0,
                    photo: ""
                });
                setPhotoValue();
            } else {
                alert("상품등록 실패");
                return;
            }
        })
        .catch(err => console.log(err));
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
        setProduct(prevProduct => ({ ...prevProduct, productType: type}));
        setTotalPrice(totalPrice + priceDifference);
    };
        
    return (
        <ProductInsertSectionBlock>
            <div className='title'>
                <h2>서비스 접수</h2>
                <p>부름을 부르고 싶은 시간을 선택해주세요</p>
            </div>
            <form onSubmit={onSubmit}>
                <div className='time'>
                    <select name="category" id="category" value={product.category} onChange={handleChange}>
                        <option value="no_select" disabled>방문 희망시간</option>
                        <option value="오전(8시~10시)">오전(8시~10시)</option>
                        <option value="오후(13시~15시)">오후(13시~15시)</option>
                        <option value="저녁(15시~17시)">저녁(15시~17시)</option>
                        <option value="언제든 가능">언제든 가능</option>
                    </select>
                </div>
                <div className='getName'>
                    <label htmlFor="name">성함을 입력해주세요.</label>
                    <input required type="text" name="name" id="name" value={product.name} onChange={handleChange} placeholder='이름' />
                </div>
                <div className='address'>
                    <label htmlFor="addr1">부름을 부르실 주소를 입력해주세요.</label>
                    <div className='postNo'>
                        <input style={{ width:'150px'}} type="text" name="zipCode" id="zipCode" value={product.zipCode} onChange={handleChange} readOnly placeholder='우편번호'  />
                        <button type="button" onClick={openDaumPostcode} style={{ height:'50px', verticalAlign:'middle', padding:'0 5px', marginRight:'5px'}}>주소검색</button>
                    </div>
                    <div className='addr1'>
                        <input type="text" name="addr1" id="addr1" value={product.addr1} onChange={handleChange} onClick={openDaumPostcode} readOnly placeholder='주소입력' />
                    </div>
                    <div className='addr2'>
                        <input type="text" name="addr2" id="addr2" ref={mAddressSubRef} value={product.addr2} onChange={handleChange} placeholder='층,동,호수 입력' />
                    </div>
                </div>
                <div className='homeType'>
                    <label htmlFor="homeType">건물의 유형을 선택해주세요.</label>
                    <select name="homeType" id="homeType" value={product.homeType} onChange={handleChange}>
                        <option value="no_select" disabled>선택</option>
                        <option value="다세대&#183;다가구">다세대&#183;다가구</option>
                        <option value="오피스텔&#183;도시형생활주택">오피스텔&#183;도시형생활주택</option>
                        <option value="아파트">아파트</option>
                    </select>
                </div>
                <div className='serviceType'>
                    <label>서비스 유형을 선택해주세요.</label>
                    <button type="button" className={product.productType === "기본형" ? "selected" : ""} onClick={() => handleProductTypeClick("기본형")}>기본형</button>
                    <button type="button" className={product.productType === "고급형" ? "selected" : ""} onClick={() => handleProductTypeClick("고급형")}>고급형</button>
                </div>
                <div className='description'>
                    <label htmlFor="description">특이사항이 있으면 남겨주세요</label>
                    <textarea name="description" id="description" value={product.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="photo">상품사진:</label>
                    <input type="file" name="photo" id="photo" value={photoValue} onChange={handleFileChange} />
                </div>
                <div className="btn">
                    <button type="submit">등록</button>
                </div>
                <div>
                    예상금액 {totalPrice}
                </div>
            </form>
        </ProductInsertSectionBlock>
    );
};

export default ProductInsertSection;