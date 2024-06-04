import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {fetchCart} from '@/store/product'

const CartSectionBlock = styled.div`
    padding-top: 100px;
`
const TableBlock = styled.table`
col:nth-child(1) { width: 50px; }
col:nth-child(2) { width: 100px; }
col:nth-child(3) { width: auto; }
col:nth-child(4) { width: 100px; }
col:nth-child(5) { width: 100px; }
col:nth-child(6) { width: 100px; }
th,
  td {
    padding: 7px;
  }
  tbody {
    td:nth-child(4) {
      text-align: center;
      input {
        border: 1px solid #000;
        text-align: center;
        padding: 5px 0;
        width: 50px;
      }
    }
    td:nth-child(5) {
      text-align: right;
    }
    td:nth-child(9) {
      text-align: center;
      button {
        padding: 5px 8px;
        border-radius: 3px;
        background: red;
        color: #fff;
      }
    }
  }
  tfoot {
    td {
      text-align: center;
    }
  }
`

const Button = styled.div`
  text-align:center;
  button { padding:10px; margin:30px 10px }
`

const CartSection = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const carts = useSelector(state=>state.products.carts)
    const user = useSelector(state=>state.members.user)
   
    const [total, setTotal] = useState(0)
    const [allCount, setAllCount] = useState(0)

    // 각 제품에 대한 수량 상태를 관리하기 위한 상태
    const [quantityValues, setQuantityValues] = useState({});
    
    const onChange = (e, cNo, inventory) => {
        let newQty = parseInt(e.target.value)
        if (newQty<1) {
            newQty = 1
        }
        if (newQty>inventory) {
            newQty = inventory
        }
        setQuantityValues(prevState => ({
            ...prevState,
            [cNo]: newQty
        }));
        if (user) {
            axios.get(`http://localhost:8001/product/cartQtyUpdate?cartNo=${cNo}&qty=${newQty}`)
            .then((res) => {
                if (res.data.affectedRows==1) {
                    console.log("장바구니 수량 업데이트 성공")
                    dispatch(fetchCart(user.userNo))
                } else {
                    console.log("장바구니 수량 업데이트 실패")
                }
            })
            .catch((error) => {
                console.error('수량 업데이트 중 오류 발생:', error);
            });
        } 
    }

    const removeCartItem = (cNo)=>{
        if (user) {
            axios.get(`http://localhost:8001/product/cartItemRemove?cartNo=${cNo}`)
            .then((res) => {
                if (res.data.affectedRows==1) {
                    console.log("장바구니 아이템 삭제 성공")
                    dispatch(fetchCart(user.userNo))
                    console.log(user.userNo)
                } else {
                    console.log("장바구니 아이템 삭제 실패")
                }
            })
            .catch((error) => {
                console.error('삭제 중 오류 발생:', error);
            });
        } 
    }

    const allBuy = (e)=>{
        e.preventDefault()
        if (!user) {
            alert("로그인을 하십시오.")
            sessionStorage.setItem('previousUrl', '/cart');
            navigate("/login")
        } else {
            navigate("/payment", {state:{product: carts, path:'cart'}})
        }
    }

    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleToggle = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };


    const partBuy = (e)=>{
        e.preventDefault()
        if (!user) {
            alert("로그인을 하십시오.")
            sessionStorage.setItem('previousUrl', '/cart');
            navigate("/login")
        } else {
            const selectedProductsData = carts.filter(item => selectedProducts.includes(item.prNo));
            navigate("/payment", {state:{product:selectedProductsData, path:'cart'}})
        }
    }
    useEffect(() => {
        if (user) {
          dispatch(fetchCart(user.userNo));
        }
      }, [dispatch, user]);

    useEffect(() => {
        if (carts.length) {
            setTotal(carts.reduce((acc, item)=>acc+(parseInt(item.price) * parseInt(item.qty)), 0))
            setAllCount(carts.reduce((acc, item)=>acc+(parseInt(item.qty)), 0))
        } else {
            setTotal(0)
            setAllCount(0)
        }
    }, [carts]);

    return (
        <CartSectionBlock>
            <TableBlock border="1">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>시간대</th>
                        <th>예약자 성함</th>
                        <th>우편함</th>
                        <th>주소</th>
                        <th>집구조</th>
                        <th>신청타입</th>
                        <th>가격</th>
                        <th>기타</th>
                    </tr>
                </thead>
                { carts && carts.length ? 
                    <tbody>
                        {  carts.map((item, index)=>(
                                <tr key={index}>
                                    <td style={{textAlign:'center'}}><input type="checkbox" name="choice" onClick={()=>handleToggle(item.prNo)} /></td>
                                    <td>
                                        { item.category }
                                    </td>
                                    <td>
                                        { item.name }
                                    </td>
                                    <td>
                                        { item.zipCode }
                                    </td>
                                    <td>
                                        { item.addr1}  { item.addr2}
                                    </td>
                                    <td>
                                        { item.homeType }
                                    </td>
                                    <td>
                                        { item.productType }
                                    </td>
                                    <td>
                                        { (parseInt(item.price) * parseInt(item.qty)).toLocaleString() }원
                                    </td>
                                    <td>
                                        <button type="button" onClick={ ()=>removeCartItem(item.cartNo)}>예약취소</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody> 
                    : 
                    <tbody>
                        <tr>
                            <td 
                            colSpan="5" 
                            style={{padding: '100px 0', textAlign: 'center', fontSize: '30px'}}>
                                장바구니가 비어 있습니다.
                            </td>
                        </tr>
                    </tbody> 
                }
                <tfoot>
                    <tr>
                        <td colSpan="9">
                            총 주문금액 : { total.toLocaleString() }원 <br/>
                            주문상품수량 : { carts && carts.length }종 {allCount}개
                        </td>
                    </tr>
                </tfoot>
            </TableBlock>
            <Button>
                <button type="button" onClick={ partBuy }>선택예약 확정하기</button>
                <button type="button" onClick={ allBuy }>전체예약 확정하기</button>
            </Button>
        </CartSectionBlock>
    );
};

export default CartSection;