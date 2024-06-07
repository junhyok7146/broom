import React, {useState, useEffect} from 'react';
import ProductCategory from '@/components/product/ProductCategory'
import ProductSection from '@/components/product/ProductSection'
import { useLocation } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { fetchProduct, setPage } from '@/store/product'

const ProductView = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    // location.state가 없는 경우 기본값 설정
    const { page = 1, category = 'all' } = location.state || {};

    const [title, setTitle] = useState(category);

    const changeTitle = (value) => {
        setTitle(value);
        dispatch(setPage(1));
        dispatch(fetchProduct(1, value));
    };

    useEffect(() => {
        dispatch(setPage(page));
        dispatch(fetchProduct(page, category));
    }, [dispatch, page, category]);

    return (
        <div className="row">
            <ProductCategory changeTitle={changeTitle} title={title} />
            <ProductSection title={title} />
        </div>
    );
};

export default ProductView;