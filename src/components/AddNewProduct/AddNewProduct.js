import React, { useState } from 'react'
import './AddNewProduct.css';
import products from '../../InfosProject';
import { Button } from 'react-bootstrap';

export default function AddNewProduct({ getAllProducts }) {


    const [newProductTitle, setNewProductTitle] = useState('')
    const [newProductPrice, setNewProductPrice] = useState('')
    const [newProductCount, setNewProductCount] = useState('')
    const [newProductImg, setNewProductImg] = useState('')
    const [newProductPopularity, setNewProductPopularity] = useState('')
    const [newProductSale, setNewProductSale] = useState('')
    const [newProductColors, setNewProductColors] = useState('')

    const newProductsInfos = {
        title: newProductTitle,
        price: newProductPrice,
        count: newProductCount,
        img: newProductImg ? newProductImg : 'img/noProduct.png',
        popularity: newProductPopularity,
        sale: newProductSale,
        colors: newProductColors
    }

    const addNewProduct = (event) => {

        const newProducts = [...products, newProductsInfos];
        event.preventDefault();
        getAllProducts(newProducts);
        resetForm();
    }

    function resetForm() {
        setNewProductTitle('')
        setNewProductPrice('')
        setNewProductCount('')
        setNewProductImg('')
        setNewProductPopularity('')
        setNewProductSale('')
        setNewProductColors('')
    }

    return (
        <div className='products-main'>
            <h1 className='products-title'>افزودن محصول جدید</h1>

            <form action="#" className='add-products-form'>
                <div className='add-products-form-wrap'>
                    <div className='add-products-form-group'>
                        <input type="text" placeholder='اسم محصول را بنویسید' className='add-products-input' value={newProductTitle} onChange={(event) => setNewProductTitle(event.target.value)} />
                    </div>
                    <div className='add-products-form-group'>
                        <input type="text" placeholder='قیمت محصول را بنویسید' className='add-products-input' value={newProductPrice} onChange={(event) => setNewProductPrice(event.target.value)} />
                    </div>
                    <div className='add-products-form-group'>
                        <input type="text" placeholder='موجودی محصول را بنویسید' className='add-products-input' value={newProductCount} onChange={(event) => setNewProductCount(event.target.value)} />
                    </div>
                    <div className='add-products-form-group'>
                        <input type="text" placeholder='آدرس عکس محصول را بنویسید' className='add-products-input' value={newProductImg} onChange={(event) => setNewProductImg(event.target.value)} />
                    </div>
                    <div className='add-products-form-group'>
                        <input type="text" placeholder='میزان محبوبیت محصول را بنویسید' className='add-products-input' value={newProductPopularity} onChange={(event) => setNewProductPopularity(event.target.value)} />
                    </div>
                    <div className='add-products-form-group'>
                        <input type="text" placeholder='میزان فروش محصول را بنویسید' className='add-products-input' value={newProductSale} onChange={(event) => setNewProductSale(event.target.value)} />
                    </div>
                    <div className='add-products-form-group'>
                        <input type="text" placeholder='تعداد رنگ بندی محصول را بنویسید' className='add-products-input' value={newProductColors} onChange={(event) => setNewProductColors(event.target.value)} />
                    </div>
                </div>
                <Button className='btn-success border-0 py-3 px-5 fw-bold' onClick={addNewProduct}>ثبت محصول</Button>
            </form>
        </div>
    )
}
