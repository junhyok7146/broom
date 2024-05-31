import React from 'react';
import {Route, Routes}  from 'react-router-dom'
import Layout from '@/Layout'
import HomeView from '@/views/HomeView'
import ProductView from '@/views/product/ProductView'
import ProductDetailView from '@/views/product/ProductDetailView'
import ProductModifyView from '@/views/product/ProductModifyView'
import ProductApply from '@/views/product/ProductApplyView'
import CartView from '@/views/product/CartView'
import ProductInsertView from '@/views/product/ProductInsertView'
import LoginView from '@/views/member/LoginView'
import JoinView from '@/views/member/JoinView'
import MemberModifyView from '@/views/member/MemberModifyView'
import BoardListView from '@/views/board/BoardListView'
import BoardWriteView from '@/views/board/BoardWriteView'
import BoardDetailView from '@/views/board/BoardDetailView'
import BoardModifyView from '@/views/board/BoardModifyView'
import PaymentView from '@/views/product/PaymentView'
import PaymentFinishView from '@/views/product/PaymentFinishView'
import MyOrderView from '@/views/product/MyOrderView'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={ <HomeView /> } />
        <Route path="/product" element={ <ProductView />} />
        <Route path="/product/:id" element={ <ProductDetailView />} />
        <Route path="/productModify" element={ <ProductModifyView /> } />
        <Route path="/productApply" element={ <ProductApply /> } />
        <Route path="/cart" element={ <CartView />} />
        <Route path="/productInsert" element={ <ProductInsertView />} />
        <Route path="/login" element={ <LoginView /> } />
        <Route path="/join" element={ <JoinView /> } />
        <Route path="/memberModify" element={ <MemberModifyView /> } />
        <Route path="/boardList" element={ <BoardListView /> } />
        <Route path="/boardList/:subject" element={ <BoardDetailView /> } />
        <Route path="/boardWrite" element={ <BoardWriteView /> } />
        <Route path="/boardModify/:subject" element={ <BoardModifyView /> } />
        <Route path="/payment" element={ <PaymentView /> } />
        <Route path="/paymentFinish" element={ <PaymentFinishView /> } />
        <Route path="/myOrder" element={ <MyOrderView /> } />
      </Route>
    </Routes>
  );
};

export default App;