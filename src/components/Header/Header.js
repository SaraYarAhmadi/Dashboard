import React, { useState } from 'react';
import Switch from './Switch/Switch';
import SearchBoxItem from './SearchBoxItem/SearchBoxItem';
import { useSelector } from 'react-redux';
import './Header.css'

export default function Header() {

    const { isDark } = useSelector(state => state.theme);
    const { products } = useSelector(state => state.products);
    const [keyword, setKeyword] = useState('');

    function getFilterProducts(products) {
        return products.filter(product => product.title.includes(keyword));
    }

    return (
        <div className={`header ${isDark ? 'header-dark' : 'header-light'}`}>
            <div className="admin-profile">
                <img src="/img/1.jpg" alt="Admin Profile" />
                <div>
                    <h1> سارا یاراحمدی  </h1>
                    <h3>برنامه نویس فرانت اند</h3>
                </div>
            </div>
            <div className='flexBasic header-left-section'>
                <div className="search-box">
                    <input type="text" placeholder='جست و جو بکنید ...' onChange={(e) => setKeyword(e.target.value)} value={keyword} />
                    <div className={`${!!keyword ? 'd-block' : 'd-none'} search-box-result`} >
                        <ul>
                            {getFilterProducts(products).map((product, index) => (
                                <SearchBoxItem key={product.id} index={index} {...product} />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='flexBasic'>
                    <Switch  />
                </div>

            </div>
        </div>
    )
}