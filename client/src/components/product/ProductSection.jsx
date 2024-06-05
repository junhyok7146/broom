import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BsCartPlusFill, BsCartPlus } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { setPage, fetchProduct, fetchCart } from '@/store/product';
import { formatCurrency } from '@/components/product/utils';
import axios from 'axios';

const ProductSectionBlock = styled.div`
padding-top: 80px;
`;

const UlBlock = styled.ul`
    list-style: none;
    margin-top: 50px;
`;

const ListBlock = styled.li`
    flex: 0 0 21%;
    margin: 20px 2%;
    padding: 30px;
    border-radius: 15px;
    background: #fafafa;
    display: flex;
    flex-direction: column;
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ddd;
            padding-bottom: 15px;
            .top_left {
                display: flex;
                align-items: center;
                .icon {
                    font-size: 40px;
                    margin: 0 10px;
                }
                .name {
                    font-weight: 600;
                }
            }
            button {
                background: #0059e9;
                color: #fff;
                padding: 10px;
                border-radius: 15px;
            }
            .on {
                color: #0059e9;
                font-weight: 600;
            }
        }
        .bottom {
            display: flex;
            justify-content: space-between;
            padding-top: 15px;
            height: 70px;
            align-items: center;
            @media (max-width: 600px) {
                flex-wrap: wrap;    
            }
            .bottom_left{
                display: flex
                flex-direction: column;
            }
            .bottom_right{
                display: flex
                flex-direction: column;
            }
        }
`;

const LoadingBlock = styled.div`
    display: flex;
    justify-content: center;
    margin: 100px 0;
`;

const ButtonBlock = styled.div`
    button {
        margin: 50px 5px;
        padding: 5px 10px;
        &.on {
            background: #0059e9;
            color: #fff;
        }
    }
`;

const ProductInsert = styled.div`
    text-align: center;
    margin: 50px 0;
    a {
        padding: 10px 20px;
        background: #999;
    }
`;

const PageButton = styled.div`
    text-align: center;
    button {
        padding: 5px 10px;
        background: #ddd;
        margin: 20px 5px;
        &.on {
            background: #0059e9;
            color:#fff;
            border-radius: 5px;
        }
    }
`;

const ProductSection = ({ title }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.members.user);
    const carts = useSelector((state) => state.products.carts);
    const allData = useSelector((state) => state.products.products);
    const currentPage = useSelector((state) => state.products.currentPage);
    const totalCount = useSelector((state) => state.products.totalCount);
    const totalPages = Math.ceil(totalCount / 12);
    const [products, setProducts] = useState(null);

    const sortType = [
        { type: 'name', text: '상품명순' },
        { type: 'price', text: '가격순' },
    ];

    const [changeSort, setChangeSort] = useState("");

    const [loading, setLoading] = useState(false);

    const sortFlag = useRef(false);

    const sortProduct = (keyname) => {
        if (!sortFlag.current) {
            setProducts((products) => {
                let sortProducts = [...products];
                return sortProducts.sort((a, b) => (a[keyname] < b[keyname] ? -1 : 1));
            });
        } else {
            setProducts((products) => {
                let sortProducts = [...products];
                return sortProducts.sort((a, b) => (a[keyname] > b[keyname] ? -1 : 1));
            });
        }
        sortFlag.current = !sortFlag.current;
    };

    const cartIdCount = (pNo) => {
        const userItem = carts.find(item=>item.prNo==pNo)
        if (userItem) {
            return userItem.qty
        } else {
            return 0
        }
    }

    const addToCart = async (no, addNo)=>{
        if (user) {
            axios.post("http://localhost:8001/product/cart", {prNo:no, userNo:user.userNo, qty:1, addNo:addNo})
            .then((res)=>{
                if (res.data.affectedRows!=0) {
                    console.log("장바구니 담기 성공")
                    dispatch(fetchCart(user.userNo))
                } else {
                    console.log("장바구니 담기 실패")
                }
            })
            .catch(err=>console.log(err))
        } else {
            alert("로그인을 해주세요.")
            sessionStorage.setItem('previousUrl', '/product');
            navigate("/login")
        }
    }

    const renderPageButtons = () => {
        const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
        const endPage = Math.min(startPage + 9, totalPages);
        const pages = [];
        if (startPage > 1) {
            pages.push(
                <button key="prev" onClick={() => dispatch(setPage(startPage - 1))}>
                    &lt;
                </button>
            );
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={currentPage === i ? 'on' : ''}
                    onClick={() => dispatch(setPage(i))}
                >
                    {i}
                </button>
            );
        }
        if (endPage < totalPages) {
            pages.push(
                <button key="next" onClick={() => dispatch(setPage(endPage + 1))}>
                    &gt;
                </button>
            );
        }
        return pages;
    };

    useEffect(() => {
        dispatch(fetchProduct(currentPage, title));
    }, [dispatch, currentPage, title]);

    useEffect(() => {
        if (allData.length > 0) {
            setProducts(allData);
            setLoading(true);
        }
    }, [allData]);

    if (!loading) {
        return (
            <ProductSectionBlock>
                <LoadingBlock>
                    <p>들어온 신청이 없습니다.</p>
                </LoadingBlock>
            </ProductSectionBlock>
        );
    }
    return (
        <ProductSectionBlock>
            <ButtonBlock>
                {sortType.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setChangeSort(item.type);
                            sortProduct(item.type);
                        }}
                        className={changeSort === item.type ? "on" : ""}
                    >
                        {item.text}
                    </button>
                ))}
            </ButtonBlock>
            <UlBlock>
                {products.map((item, index) => {
                    const remainingQty = item.qty - cartIdCount(item.prNo);
                    return (
                        <ListBlock key={index}>
                            <div className="top">
                                <div className='top_left'>
                                    <Link to={`/product/${item.prNo}`} state={{ item: item }}>
                                        <div className='icon'><IoPersonSharp /></div>
                                    </Link>
                                    <div className='name'>
                                        <a href="#">{item.name}</a>
                                    </div>
                                </div>
                                    {item.qty !== cartIdCount(item.prNo) ? (
                                            <>
                                                <button onClick={() => addToCart(item.prNo, item.addNo)}>
                                                    <BsCartPlusFill />
                                                    {remainingQty === 1 && (
                                                    <span>신청대기중</span>
                                                )}
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span className='on'>예약완료</span>
                                            </>
                                    )}
                            </div>
                            <div className="bottom">
                                <div className='bottom_left'>
                                    <div>주소: {item.addr1}</div>
                                    <div>건물유형: {item.homeType}</div>
                                </div>
                                <div className='bottom_right'>
                                    <div>서비스유형: {item.productType}</div>
                                    <div>예상기본가격: {formatCurrency(item.price)}</div>
                                </div>
                            </div>
                        </ListBlock>
                    );
                })}
            </UlBlock>
            <PageButton className="pagebutton">{renderPageButtons()}</PageButton>
        </ProductSectionBlock>
    );
};

export default ProductSection;