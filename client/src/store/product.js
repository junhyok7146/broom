import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

const productSlice = createSlice({
    name:"products",
    initialState : {
        products : [],   // producttbl : { prNo, category, name, price, description, inventory, photo},
        carts: [],       // cart : {cartNo:cartNo, userNo:userNo, prNo:prNo, qty:3,  }
        cartsCount : 0,
        orders:[],
        customer: [],
        totalCount:0,
        currentPage:1
    },
    reducers : {
        initProducts(state, action){
            state.products = action.payload.data
            state.totalCount = action.payload.totalCount
        },
        initCarts(state, action){
            state.carts = action.payload
            state.cartsCount = state.carts.length
        },
        initOrders(state, action){
            state.orders = action.payload
        },
        initCustomer(state, action){
            state.customer = action.payload
        },
        setPage(state, action){
            state.currentPage = action.payload
        }
    }
})

export const { initProducts, initCarts, initOrders, initCustomer, setPage } = productSlice.actions;

export const fetchProduct = (page, category)=>(dispatch)=>{
    axios.get(`http://localhost:8001/product/list?page=${page}&category=${category}`)
    .then((res)=>{
        console.log("상품목록", res)
        const { totalCount, data} = res.data;
        dispatch(initProducts({ totalCount : totalCount, data : data }))
    })
    .catch(err=>console.log(err))
}

export const fetchCart = (userNo) => (dispatch)=>{
    axios.get(`http://localhost:8001/product/cartList?no=${userNo}`)
    .then((res)=>{
        console.log("장바구니목록", res)
        const data = res.data;
        console.log("실제장바구니데이터", data)
        dispatch(initCarts(data))
    })
    .catch(err=>console.log(err))
}

export const fetchOrder = (userNo) => (dispatch)=>{
    axios.get(`http://localhost:8001/product/myOrderList?no=${userNo}`)
    .then((res)=>{
        console.log("주문목록", res)
        const data = res.data;
        dispatch(initOrders(data))
    })
    .catch(err=>console.log(err))
}

export const fetchCustomer = (userNo) => (dispatch)=>{
    axios.get(`http://localhost:8001/product/customer?no=${userNo}`)
    .then((res)=>{
        console.log("주문목록", res)
        const data = res.data;
        dispatch(initCustomer(data))
    })
    .catch(err=>console.log(err))
}

export default productSlice.reducer;